// Json
import patchsData from './patchs/patchs.json';

// Utils
import { DOMAINS_LOCALE } from '../utils/constants';

function Sitemap() {}

export const getServerSideProps = async (ctx) => {
  const { locale, res } = ctx;

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

    <url>
      <loc>${DOMAINS_LOCALE[locale]}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>

    <url>
      <loc>${DOMAINS_LOCALE[locale]}/random-rush</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>

    <url>
      <loc>${DOMAINS_LOCALE[locale]}/challenge-battle</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>

    <url>
      <loc>${DOMAINS_LOCALE[locale]}/patchs</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>

    ${patchsData[locale].map((item) => `
      <url>
          <loc>${DOMAINS_LOCALE[locale]}/patchs/${item.slug}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>daily</changefreq>
          <priority>1.0</priority>
      </url>
      `).join(' ')}
  </urlset>
`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return { props: {} };
};

export default Sitemap;
