import { DocumentsApi } from './documents.api';

const DOCS_PATH =
  'dist/' +
  'dev/' +
  'apps/nxdos/documentation/documentation-site/public/documentation/';

describe('Nxdos - Documentation Site - Data Access - DocumentsApi', () => {
  const testDocumentsApi = new DocumentsApi({
    publicDocsRootPath: DOCS_PATH,
  });

  it('should successfully create a generator instance', () => {
    expect(testDocumentsApi).toHaveProperty('getDocument');
    expect(testDocumentsApi).toHaveProperty('getStaticDocumentPaths');
  });

  it('should list static paths to documentation segments', () => {
    const testDocumentsApi_staticPaths =
      testDocumentsApi.getStaticDocumentPaths();
    expect(testDocumentsApi_staticPaths.length).toBeGreaterThan(0);
  });

  it('should successfully retrieve documents', () => {
    const testDocumentsApi_testDocument = testDocumentsApi.getDocument([
      'nxdos',
      'introduction',
    ]);
    expect(testDocumentsApi_testDocument).toHaveProperty('filePath');
    expect(testDocumentsApi_testDocument).toHaveProperty('frontMatterData');
    expect(testDocumentsApi_testDocument).toHaveProperty('content');
  });
});
