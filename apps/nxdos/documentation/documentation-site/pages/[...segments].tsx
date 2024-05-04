import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';
import { ParsedUrlQuery } from 'querystring';
import { DocViewer } from '@nxdos/documentation-site/feature/doc-viewer';
import { Menu, MenuItem } from '@nxdos/documentation-site/models/menu';
import {
  DocumentData,
  TocItemMeta,
} from '@nxdos/documentation-site/models/document';
import {
  collectHeadings,
  collectSections,
  renderContentToString,
} from '@nxdos/documentation-site/ui/common';

import { nxdosDocumentsApi, nxdosMenuApi } from '../lib/api';
import { algoliaSectionsStore } from '../lib/parse-algolia-sections';
import { generateSitemapXML } from '../lib/generate-sitemap-xml';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export interface SegmentsProps extends ParsedUrlQuery {
  segments: string[];
}

const Segments = ({
  menu,
  sitemap,
  frontMatterData,
  renderedContentHTML,
  tocList,
}) => {
  const router = useRouter();

  useEffect(() => {
    const anchor = router.asPath.split('#').pop();
    setTimeout(() => {
      document.getElementById(anchor)?.scrollIntoView();
    }, 200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pageTitle =
    'Nx\u2011DOS' +
    (frontMatterData && frontMatterData.title
      ? ' / ' + frontMatterData.title
      : '');
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <DocViewer
        menu={menu || ({} as unknown)}
        sitemap={sitemap || ({} as unknown)}
        frontMatterData={frontMatterData || ({} as unknown)}
        renderedContentHTML={renderedContentHTML || ({} as unknown)}
        tocList={tocList || ({} as unknown)}
      />
    </>
  );
};

export const getStaticPaths: GetStaticPaths<SegmentsProps> = async () => {
  const staticPaths = nxdosDocumentsApi.getStaticDocumentPaths();

  if (
    process.env['NEXT_PHASE'] === PHASE_PRODUCTION_BUILD ||
    process.env['NX_TASK_TARGET_TARGET'] === 'test'
  ) {
    console.log('');
    console.log('', '   - build detected: crawling documentation ...', '');
    staticPaths.forEach(async (path) => {
      let document: DocumentData | undefined;
      try {
        document = nxdosDocumentsApi.getDocument(path.params.segments);
      } catch (e) {
        console.log(
          '',
          "   - !! can't find document: " + path.params.segments.join('/'),
          ''
        );
      }

      // split documentation into searchable chunks for algolia
      const sectionList = await collectSections(
        document,
        path.params.segments.join('/')
      );
      sectionList.forEach((section) => {
        algoliaSectionsStore.create(section);
      });
    });
    console.log(
      '',
      '   \x1b[1m\x1b[32m✓\x1b[0m successfully parsed algolia records',
      ''
    );
    generateSitemapXML(staticPaths);
    console.log(
      '',
      '   \x1b[1m\x1b[32m✓\x1b[0m generated sitemap.xml for crawlers',
      ''
    );
  }

  return {
    paths: staticPaths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{
  menu: Menu;
  sitemap: MenuItem[];
  frontMatterData: DocumentData['frontMatterData'];
  renderedContentHTML: string;
  tocList: TocItemMeta[];
}> = async ({ params }: { params: SegmentsProps }) => {
  let document: DocumentData | undefined;

  try {
    document = nxdosDocumentsApi.getDocument(params.segments);
  } catch (e) {
    console.log("can't find document: " + params.segments.join('/'));
  }

  const menu = nxdosMenuApi.getMenu();
  const sitemap = nxdosMenuApi.getOrderedSitemap();
  const renderedContentHTML = await renderContentToString(document);
  const tocList = collectHeadings(document);
  const frontMatterData = document.frontMatterData;

  return {
    props: {
      menu,
      sitemap,
      frontMatterData,
      renderedContentHTML,
      tocList,
    },
  };
};

export default Segments;
