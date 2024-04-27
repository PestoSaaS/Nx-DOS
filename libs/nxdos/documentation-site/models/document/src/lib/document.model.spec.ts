import { DocumentData, TocItemMeta } from './document.model';

describe('Nxdos - Documentation Site - Models - Document', () => {
  describe('interfaces only exist at compile time, no code to cover here.', () => {
    const test_DocumentData: DocumentData = {
      filePath: 'test_DocumentData_filePath',
      frontMatterData: {
        title: 'Test document',
        timestamp: {
          created_at: '2023-02-08T05:35:07.322Z',
          last_updated_at: '2023-02-08T05:35:07.322Z',
        },
        author: {
          name: 'Test Author',
        },
      },
      content: 'test_DocumentData_content',
    };
    const test_TocItemMeta: TocItemMeta = {
      sectionTitle: 'test_tocItemMeta_sectionTitle',
      anchorLink: 'test_tocItemMeta_anchorLink',
      sectionInset: 'test_tocItemMeta_sectionInset',
      sectionTag: 'test_tocItemMeta_sectionTag',
      key: 1,
    };

    it('type compliance check for Document interface with valid "frontMatterData", "path" and "content"', () => {
      expect(test_DocumentData).toHaveProperty('filePath');
      expect(test_DocumentData).toHaveProperty('frontMatterData');
      expect(test_DocumentData).toHaveProperty('content');
    });

    it('type compliance check for TocItemMeta interface with valid "sectionTitle/Inset/Tag" and "anchorLink"', () => {
      expect(test_TocItemMeta).toHaveProperty('sectionTitle');
      expect(test_TocItemMeta).toHaveProperty('anchorLink');
      expect(test_TocItemMeta).toHaveProperty('sectionInset');
      expect(test_TocItemMeta).toHaveProperty('sectionTag');
      expect(test_TocItemMeta).toHaveProperty('key');
    });
  });
});
