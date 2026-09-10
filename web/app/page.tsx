import { Header } from '@/components/Header';
import { Hero, Responsibilities, FAQ, Footer } from '@/components/Sections';
import { Apply } from '@/components/Apply';
import { site } from '@/lib/site';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EmploymentAgency',
  name: site.name,
  description: site.description,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  areaServed: 'Worldwide',
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <Hero />
        <Apply />
        <Responsibilities />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
