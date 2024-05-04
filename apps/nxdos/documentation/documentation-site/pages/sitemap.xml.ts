import { nxdosDocumentsApi } from '../lib/api';

//pages/sitemap.xml.js
const EXTERNAL_DATA_URL = 'https://nxdos.org/';

function generateSiteMap(listOfUrls) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${listOfUrls
       .map((relativePath) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}${relativePath}`}</loc>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const staticPaths = nxdosDocumentsApi.getStaticDocumentPaths();
  const listOfRelativePathURLs = staticPaths.map(({ params }) =>
    params.segments.join('/')
  );

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(listOfRelativePathURLs);

  // we send the XML to the browser
  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
