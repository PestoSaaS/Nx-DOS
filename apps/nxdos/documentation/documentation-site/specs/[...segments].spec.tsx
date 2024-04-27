import React from 'react';
import { act, render, screen } from '@testing-library/react';
import Segments from '../pages/[...segments]';
import {
  ThemeContextProvider,
  collectHeadings,
  renderContent,
} from '@nxdos/documentation-site/ui/common';
import mockRouter from 'next-router-mock';
import { nxdosMenuApi, nxdosDocumentsApi } from '../lib/api';
import ReactDOMServer from 'react-dom/server';
import { mockIntersectionObserver } from '@shared/util/testing';

import { getStaticProps, getStaticPaths } from '../pages/[...segments]';
import { ParsedUrlQuery } from 'querystring';
import { GetStaticPathsContext, GetStaticPropsContext } from 'next';
import { DocumentData } from '@nxdos/documentation-site/models/document';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('Route: [...segments]', () => {
  // Set the initial url:
  mockRouter.push('/introduction');
  mockIntersectionObserver();

  beforeAll(async () => {
    // Allow time to write built documentation files to memory
    await new Promise((resolve) => setTimeout(resolve, 500));
  });

  describe('pre-render functions', () => {
    const context = {
      params: { segments: ['introduction'] } as ParsedUrlQuery,
    };

    it('should return valid array of static paths to documentation segments', async () => {
      const { paths } = await getStaticPaths(context as GetStaticPathsContext);
      expect(paths.length).toBeGreaterThan(0);
    });

    it('should return valid props for documents', async () => {
      const testSegmentProps = await getStaticProps(
        context as GetStaticPropsContext
      );
      expect(
        typeof testSegmentProps['props']['renderedContentHTML'] === 'string'
      ).toBeTruthy();
      expect(
        testSegmentProps['props']['renderedContentHTML'].length
      ).toBeGreaterThan(0);
    });
  });

  describe('page template', () => {
    let baseElement: HTMLElement, asFragment: () => DocumentFragment;
    let document: DocumentData;

    beforeAll(async () => {
      document = await nxdosDocumentsApi.getDocument([
        'devlogs',
        'markdoc-samples',
      ]);
    });

    beforeEach(async () => {
      const menu = nxdosMenuApi.getMenu();
      const sitemap = nxdosMenuApi.getOrderedSitemap();
      const renderedContent = await renderContent(document);
      const renderedContentHTML = ReactDOMServer.renderToString(
        renderedContent as unknown as JSX.Element
      );
      const tocList = collectHeadings(document);
      const frontMatterData = document.frontMatterData;

      const Segments_TestProps = {
        menu,
        sitemap,
        frontMatterData,
        renderedContentHTML,
        tocList,
      };

      await act(() => {
        ({ baseElement, asFragment } = render(
          <ThemeContextProvider>
            <Segments {...Segments_TestProps} />
          </ThemeContextProvider>
        ));
      });
    });

    it('should render documents successfully', () => {
      expect(baseElement).toBeTruthy();
      expect(
        screen.getByText('Nx starter guide', { exact: false })
      ).toBeTruthy();
    });

    it('should match snapshot correctly', () => {
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
