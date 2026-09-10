/**
 * Pro Hiring Solutions — Google Sheets intake + email notification.
 *
 * Bound to the "Pro Hiring Solutions — Applications" spreadsheet and deployed
 * as a Web App ("Execute as: Me", "Who has access: Anyone"). The Render API is
 * the only caller and it holds the /exec URL plus the shared secret.
 *
 * Each submission appends a row to the Applications tab and emails the lead to
 * NOTIFY_EMAIL. Sending uses MailApp, so no SMTP credentials are stored anywhere.
 *
 * SETUP
 * 1. Open the Sheet -> Extensions -> Apps Script, paste this file.
 * 2. Set SECRET to match SHEETS_WEBHOOK_TOKEN on the Render service.
 * 3. Deploy -> New deployment -> Web app (Execute as Me, Anyone).
 *    To ship later edits, use Deploy -> Manage deployments -> edit the existing
 *    deployment -> Version: New version, so the /exec URL stays the same.
 */

var SECRET = 'REDACTED';
var SHEET_NAME = 'Applications';
var NOTIFY_EMAIL = 'contact@prohiringsolutions.com';
var HEADERS = ['Submitted At', 'Name', 'Age', 'Email', 'Phone', 'Field', 'Message', 'Source'];

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    if (SECRET && body.token !== SECRET) {
      return json_({ ok: false, error: 'unauthorized' });
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

    notify_(body);

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

/** Emails the new lead. Wrapped so a mail failure never loses the sheet row. */
function notify_(b) {
  try {
    var name = b.name || 'New candidate';
    var subject = 'New application: ' + name + (b.role ? ' - ' + b.role : '');
    var body = [
      'A new application was submitted on the Pro Hiring Solutions website.',
      '',
      'Name:    ' + (b.name || '-'),
      'Age:     ' + (b.age || '-'),
      'Email:   ' + (b.email || '-'),
      'Phone:   ' + (b.phone || '-'),
      'Field:   ' + (b.role || '-'),
      '',
      'Message:',
      b.message || '(none)',
      '',
      'Submitted: ' + (b.submittedAt || new Date().toISOString()),
      'Source:    ' + (b.source || '-'),
    ].join('\n');

    var options = { to: NOTIFY_EMAIL, subject: subject, body: body, name: 'Pro Hiring Solutions' };
    if (b.email) {
      options.replyTo = b.email;
    }
    MailApp.sendEmail(options);
  } catch (err) {
    console.error('Lead email failed: ' + err);
  }
}

function doGet() {
  return json_({ ok: true, service: 'pro-hiring-sheets' });
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
