import { useEffect, useMemo } from 'react';
import {
  DocumentData,
  TocItemMeta,
} from '@nxdos/documentation-site/models/document';
import { MenuItem } from '@nxdos/documentation-site/models/menu';
import { useRouter } from 'next/router';
import styles from './article.module.css';
import {
  handleCodeFenceCopy,
  handleAnchorLinkCopy,
} from '../../utils/copy-to-clipboard';
import { PanelState } from '../../..';
import { ArticleHeader } from './article-header';
import { ContentHeader, contentHeader__readerMode } from './content-header';
import { ContentFooter, contentFooter__readerMode } from './content-footer';
import { OverviewPanel } from '../overview-panel/overview-panel.base';
import { OVERVIEW_PANEL_PROPS__VIEW_BREAKPOINT_LG } from '../overview-panel/overview-panel.view-breakpoint--lg';
import { OVERVIEW_PANEL_PROPS__VIEW_BREAKPOINT_MAX_LG } from '../overview-panel/overview-panel.view-breakpoint--max-lg';
/* eslint-disable react/jsx-pascal-case */
import {
  InjectMissingCSSModules,
  READER_MODE_WORKAROUND__ARTICLE_META__CHROME,
  READER_MODE_WORKAROUND__ARTICLE_META__SAFARI,
} from '@nxdos/documentation-site/ui/markdoc';

export interface ArticleProps {
  frontMatterData: DocumentData['frontMatterData'];
  renderedContentHTML: string;
  sitemap: MenuItem[];
  tocList: TocItemMeta[];
  panelStates: {
    sidebarState: PanelState;
    searchPanelState: PanelState;
    overviewPanelState: PanelState;
  };
}

export function Article(props: ArticleProps): JSX.Element {
  const router = useRouter();

  const query = Array.isArray(router.query['segments'])
    ? router.query['segments'].join('/')
    : router.query['segments'];

  const currentPathIndex = props.sitemap.findIndex(
    (item: MenuItem) =>
      (item.overrideURL ? item.overrideURL : item.path) === query
  );

  const previousArticle =
    currentPathIndex > 0 ? props.sitemap[currentPathIndex - 1] : null;
  const nextArticle =
    currentPathIndex < props.sitemap.length && !(currentPathIndex < 0)
      ? props.sitemap[currentPathIndex + 1]
      : null;

  const content = useMemo(() => {
    return (
      <div
        className={styles['article--glitchMask']}
        dangerouslySetInnerHTML={{
          __html:
            contentHeader__readerMode({
              previousArticle,
              nextArticle,
              currentPath: router.asPath,
            }) +
            props.renderedContentHTML +
            contentFooter__readerMode({
              previousArticle,
              nextArticle,
              currentPath: router.asPath,
            }),
        }}
      />
    );
  }, [props, previousArticle, nextArticle, router.asPath]);

  const displayType: 'numeric' | 'worded' = 'worded';
  let displayDate = '';
  if (
    props.frontMatterData['timestamp'] &&
    props.frontMatterData['timestamp']['last_updated_at']
  ) {
    const parsedDate = new Date(
      props.frontMatterData['timestamp']['last_updated_at']
    );

    if (displayType === ('numeric' as typeof displayType)) {
      displayDate =
        parsedDate.getDate().toString().padStart(2, '0') +
        '/' +
        (parsedDate.getMonth() + 1).toString().padStart(2, '0') +
        '/' +
        parsedDate.getFullYear().toString();
    } else {
      displayDate =
        parsedDate.toLocaleString('default', { month: 'long' }) +
        ' ' +
        parsedDate.getDate().toString() +
        ', ' +
        parsedDate.getFullYear().toString();
    }
  }

  const closePanelActionHandler = () => {
    props.panelStates.overviewPanelState.queueNextState(false);
    props.panelStates.searchPanelState.queueNextState(false);
  };

  useEffect(() => {
    document.querySelectorAll('.copyIcon').forEach((element) => {
      element.addEventListener('click', handleCodeFenceCopy, { passive: true });
    });
    document.querySelectorAll('.anchorLinkClipboardIcon').forEach((element) => {
      element.addEventListener('click', handleAnchorLinkCopy, {
        passive: true,
      });
    });

    return () => {
      document.querySelectorAll('.copyIcon').forEach((element) => {
        /* istanbul ignore next */
        element.removeEventListener('click', handleCodeFenceCopy);
      });
      document
        .querySelectorAll('.anchorLinkClipboardIcon')
        .forEach((element) => {
          element.removeEventListener('click', handleAnchorLinkCopy);
        });
    };
  }, [content]);

  return (
    <>
      <OVERVIEW_PANEL_PROPS__VIEW_BREAKPOINT_MAX_LG
        tocList={props.tocList}
        panelStates={props.panelStates}
      />
      <div className="lg:flex-shrink-[2] relative [--overlay-pointer-events:none]">
        {/* start of workaround for reader mode -- Chrome */}
        {/* DO NOT MOVE: position in HTML hierarchy matters */}
        <READER_MODE_WORKAROUND__ARTICLE_META__CHROME
          article_title={props.frontMatterData.title}
          article_date={displayDate}
        />
        {/* end of workaround */}

        <article className={'break-words text-white flex-row flex'}>
          <div
            className={
              'prose  min-w-[100%] max-w-[100%] lg:min-w-[var(--max-width-after-bp-large)] lg:max-w-[var(--max-width-after-bp-large)] ' +
              'prose-invert lg:[--overview-panel--nested--display-type:none] articleWrapper ' +
              styles['articleWrapper'] +
              (props.panelStates.overviewPanelState.isOpen
                ? ' ' + styles['includesFadedPanel']
                : '')
            }
          >
            <ArticleHeader
              documentFrontMatterData={props.frontMatterData}
              displayDate={displayDate}
            />
            <span
              id="overviewPanelAnchor"
              className={styles['overviewPanelAnchor']}
            />
            <OverviewPanel
              tocList={props.tocList}
              closePanelActionHandler={closePanelActionHandler}
            />
            <ContentHeader
              currentPath={router.asPath}
              previousArticle={previousArticle}
              nextArticle={nextArticle}
            />

            {/* start of workaround for reader mode -- Safari */}
            {/* DO NOT MOVE: position in HTML hierarchy matters */}
            <READER_MODE_WORKAROUND__ARTICLE_META__SAFARI
              article_title={props.frontMatterData.title}
              article_date={displayDate}
            />
            {/* end of workaround */}

            {content}
            <ContentFooter
              previousArticle={previousArticle}
              nextArticle={nextArticle}
            />
          </div>
          <OVERVIEW_PANEL_PROPS__VIEW_BREAKPOINT_LG
            tocList={props.tocList}
            closePanelActionHandler={() => {
              props.panelStates.searchPanelState.queueNextState(false);
            }}
          />
        </article>
      </div>
      {/* The following invisible component is a hack to fool Next.js into 
      including the css modules for related components that are missing from
      Production build during server side rendering, please DO NOT REMOVE */}
      <InjectMissingCSSModules />
    </>
  );
}
