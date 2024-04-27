import { DocumentsApi } from '@nxdos/documentation-site/data-access/documents-api';
import { MenuApi } from '@nxdos/documentation-site/data-access/menu-api';

const DOCS_PATH = process.env['CONTAINER_BUILD']
  ? 'public/documentation/'
  : 'dist/' +
    (process.env['NX_TASK_TARGET_CONFIGURATION'] !== 'production'
      ? 'dev/'
      : '') +
    'apps/nxdos/documentation/documentation-site/public/documentation/';

export const nxdosDocumentsApi = new DocumentsApi({
  publicDocsRootPath: DOCS_PATH,
});

export const nxdosMenuApi = new MenuApi({
  publicDocsRootPath: DOCS_PATH,
});
