import { algoliaSectionsStore } from '../lib/parse-algolia-sections';
import { algoliaRecordSection } from '@nxdos/documentation-site/ui/common';

describe('Nxdos - Documentation Site - API - parse algolia sections script', () => {
  const mock_section: algoliaRecordSection = {
    articleTitle: 'test article',
    articlePath: 'test/article/path',
    sectionTitle: 'test section title',
    anchorLink: 'test/anchor/link',
    sectionURL: 'test/section/URL',
    sectionContent: 'Lorem ipsum dolor sit amet',
    sectionOrder: 1,
    subsectionOrder: 1,
    subsectionURL: 'test/subsection/URL',
  };

  it('should create a record successfully', () => {
    algoliaSectionsStore.create(mock_section);
    expect(algoliaSectionsStore.getNumberOfRecords()).toBe(1);
  });
});
