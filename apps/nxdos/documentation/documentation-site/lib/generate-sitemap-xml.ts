import fs from 'fs';
import path from 'path';
import { workspaceRoot } from '@nx/devkit';

const EXTERNAL_DATA_URL = process.env.NEXT_PUBLIC_VALID_PRODUCTION_HOSTS
  ? process.env.NEXT_PUBLIC_VALID_PRODUCTION_HOSTS.split(' ')[0]
  : 'https://nxdos.org';

const relativePath = '/apps/nxdos/documentation/documentation-site';

const workingDirectory =
  path.resolve(__dirname).split('/.next/')[0] + '/public/';

const xmlFolderPath =
  process.env['NX_TASK_TARGET_TARGET'] === 'test'
    ? workspaceRoot + '/dist/test' + relativePath + '/public/'
    : process.env['NX_TASK_TARGET_CONFIGURATION'] !== 'production'
    ? workspaceRoot + relativePath + '/public/'
    : workingDirectory;

const xmlFilePath = xmlFolderPath + 'sitemap.xml';

export const generateSitemapXML = (
  staticPaths: {
    params: {
      segments: string[];
    };
  }[]
) => {
  const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       <url>
           <loc>${`${EXTERNAL_DATA_URL}`}</loc>
           <lastmod>${new Date()}</lastmod>
           <changefreq>monthly</changefreq>
       </url>
     ${staticPaths
       .map((relativePath) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/${relativePath.params.segments.join(
             '/'
           )}`}</loc>
           <lastmod>${new Date()}</lastmod>
           <changefreq>monthly</changefreq>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;

  if (!fs.existsSync(xmlFolderPath)) {
    fs.mkdirSync(xmlFolderPath, { recursive: true });
  }
  fs.writeFileSync(xmlFilePath, sitemapXML);
};
