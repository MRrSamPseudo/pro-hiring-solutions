/**
 * Pro Hiring Solutions — Google Sheets intake webhook.
 *
 * SETUP
 * 1. Open your Google Sheet (the tab where applications should land).
 * 2. Extensions -> Apps Script. Delete any code, paste this file.
 * 3. Set SECRET below to a random string (optional but recommended),
 *    and set the same value as SHEETS_WEBHOOK_TOKEN on the Render service.
 * 4. Set SHEET_NAME to the exact tab name you want rows written to.
 * 5. Deploy -> New deployment -> type "Web app".
 *      - Execute as: Me
 *      - Who has access: Anyone
 *    Copy the Web app URL -> set it as SHEETS_WEBHOOK_URL on Render.
 * 6. Run `doPost` once from the editor to grant permissions (it will error
 *    on missing event data — that is fine, the permission prompt is the point).
 */

var SECRET = '';            // must match SHEETS_WEBHOOK_TOKEN on the server (or leave '')
var SHEET_NAME = 'Applications';

var HEADERS = ['Submitted At', 'Name', 'Age', 'Email', 'Phone', 'Field', 'Message', 'Source'];

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);

    if (SECRET && body.token !== SECRET) {
      return json_({ ok: false, error: 'unauthorized' }, 401);
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      body.submittedAt || new Date().toISOString(),
      body.name || '',
      body.age || '',
      body.email || '',
      body.phone || '',
      body.role || '',
      body.message || '',
      body.source || '',
    ]);

    return json_({ ok: true }, 200);
  } catch (err) {
    return json_({ ok: false, error: String(err) }, 400);
  }
}

function doGet() {
  return json_({ ok: true, service: 'pro-hiring-sheets' }, 200);
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
