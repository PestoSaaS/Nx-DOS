import { workspaceRoot } from '@nx/devkit';
import { MenuApi } from '../..';
import * as fs from 'fs';

export const build_documentation_sitemap = async (): Promise<{
  success: boolean;
}> => {
  const e2e_fixtures_relativePath =
    '/apps/nxdos/documentation/documentation-site-e2e/src/fixtures';

  const outputFolderPath = workspaceRoot + e2e_fixtures_relativePath;
  const jsonFilePath = outputFolderPath + '/sitemap.json';

  const DOCS_PATH =
    'dist/' +
    (process.env['NX_TASK_TARGET_CONFIGURATION'] !== 'production'
      ? 'dev/'
      : '') +
    'apps/nxdos/documentation/documentation-site/public/documentation/';

  const nxdosMenuApi = new MenuApi({
    publicDocsRootPath: DOCS_PATH,
  });

  const sitemap = nxdosMenuApi.getOrderedSitemap();

  fs.writeFileSync(jsonFilePath, JSON.stringify(sitemap, null, 4));

  console.log('successfully built documentation sitemap');
  console.log('output path: ' + jsonFilePath);

  return { success: true };
};
