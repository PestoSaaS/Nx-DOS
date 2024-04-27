import { MenuApi } from './menu.api';

const DOCS_PATH =
  'dist/' +
  'dev/' +
  'apps/nxdos/documentation/documentation-site/public/documentation/';

describe('Nxdos - Documentation Site - Data Access - MenuApi', () => {
  const testMenuApi = new MenuApi({
    publicDocsRootPath: DOCS_PATH,
  });

  it('should successfully create a generator instance', () => {
    expect(testMenuApi).toHaveProperty('menuCache');
    expect(testMenuApi['menuCache']).toBeNull();
  });

  it('should create a valid Menu', () => {
    const testMenu = testMenuApi.getMenu();
    expect(testMenuApi['menuCache']).not.toBeNull();
    expect(testMenuApi['menuCache']).toHaveProperty('sections');
    expect(testMenu).toHaveProperty('sections');
  });

  it('should extract a valid sitemap matching to snapshot', () => {
    const testSitemap = testMenuApi.getOrderedSitemap();
    expect(testSitemap.length).toBeGreaterThan(0);
    expect(testSitemap).toMatchSnapshot();
  });
});
