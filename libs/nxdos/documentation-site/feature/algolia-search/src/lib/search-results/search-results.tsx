import { useEffect, useMemo, useState } from 'react';
import { useHits } from 'react-instantsearch';
import { Pagination } from './search-results-pagination';
import { SearchResults as AlgoliaSearchResults } from 'algoliasearch-helper';
import { AlgoliaHit, BaseHit, Hit } from 'instantsearch.js/es/types';
import styles from './search-results.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { PanelState } from '@nxdos/documentation-site/ui/common';

interface SearchResultsProps {
  panelStates: {
    sidebarState: PanelState;
    searchPanelState: PanelState;
    overviewPanelState: PanelState;
  };
  testInjection?: {
    testResults: AlgoliaSearchResults<Hit<BaseHit>>;
    testPagination: () => {
      currentRefinement: number;
      nbHits: number;
      nbPages: number;
      refine: (page: number) => void;
    };
  };
}

export function SearchResults(props: SearchResultsProps) {
  const [breakpointSwitch, setBreakpointSwitch] = useState(0);
  const { results } =
    typeof props.testInjection?.testResults !== 'undefined'
      ? { results: props.testInjection.testResults }
      : // eslint-disable-next-line react-hooks/rules-of-hooks
        useHits();

  const router = useRouter();

  /* istanbul ignore next */
  const closePanelsOnNavigation = (url: string) => {
    props.panelStates.searchPanelState.queueNextState(false);
    const urlChunked = url.split('?s=');
    urlChunked.pop();
    const urlCleaned = urlChunked.join('?s=');
    window.history.replaceState('', '', urlCleaned);
  };

  /* istanbul ignore next */
  const closePanelsOnNavigation_default = (url: string) => {
    closePanelsOnNavigation(url);
    router.events.off('routeChangeComplete', closePanelsOnNavigation_default);
    router.events.off('hashChangeComplete', closePanelsOnNavigation_default);
  };

  /* istanbul ignore next */
  const closePanelsOnNavigation_alternateForSmallBreakpoint = (url: string) => {
    props.panelStates.sidebarState.queueNextState(false);
    closePanelsOnNavigation(url);
    router.events.off(
      'routeChangeComplete',
      closePanelsOnNavigation_alternateForSmallBreakpoint
    );
    router.events.off(
      'hashChangeComplete',
      closePanelsOnNavigation_alternateForSmallBreakpoint
    );
  };

  /* istanbul ignore next */
  const scrollToTop = () => {
    document
      .getElementById('scrollFrame')
      ?.scroll({ top: 0, left: 0, behavior: 'instant' });
    router.events.off('routeChangeStart', scrollToTop);
    router.events.off('hashChangeStart', scrollToTop);
  };

  /* istanbul ignore next */
  const navHandler = (event: React.MouseEvent<HTMLElement>) => {
    router.events.on('routeChangeStart', scrollToTop);
    router.events.on('hashChangeStart', scrollToTop);

    const source = event.target as HTMLElement;
    const breakpointSwitch = getComputedStyle(source).getPropertyValue(
      '--view-breakpoint-switch-sm'
    );
    if (Number(breakpointSwitch) !== 1) {
      router.events.on('routeChangeComplete', closePanelsOnNavigation_default);
      router.events.on('hashChangeComplete', closePanelsOnNavigation_default);
    } else {
      router.events.on(
        'routeChangeComplete',
        closePanelsOnNavigation_alternateForSmallBreakpoint
      );
      router.events.on(
        'hashChangeComplete',
        closePanelsOnNavigation_alternateForSmallBreakpoint
      );
    }
  };

  useEffect(() => {
    if (results?.nbHits === 0) {
      props.panelStates.searchPanelState.queueNextState(false);
    }
    const source = document.getElementsByClassName('appWrapper')[0];
    const breakpointSwitch = getComputedStyle(source).getPropertyValue(
      '--view-breakpoint-switch-sm'
    );
    setBreakpointSwitch(Number(breakpointSwitch));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results?.nbHits === 0]);

  const ResultsListNested = useMemo(() => {
    const nestedListOfHitsByArticle: AlgoliaHit[][] = [];
    const hashOfListOrderByArticle: { [key: string]: number } = {};
    let numberOfUniqueArticlesFound = 0;
    let orderNumberCount: number = results
      ? results.page * results.hitsPerPage
      : 0;

    if (results) {
      // check if the query resulted in hits
      for (let i = 0; i < results.hits.length; i++) {
        // traverse results

        // retrieve hits individually for ease of analysis
        const currentHit = results.hits[i];

        // check if a bucket of hits has been created for the article
        if (
          !(
            currentHit['articlePath'] &&
            typeof hashOfListOrderByArticle[
              currentHit['articlePath'] as keyof typeof hashOfListOrderByArticle
            ] !== 'undefined'
          )
        ) {
          // assign a list index to hits from previously unrefenced articles
          hashOfListOrderByArticle[
            currentHit['articlePath'] as keyof typeof hashOfListOrderByArticle
          ] = numberOfUniqueArticlesFound;
          // and increment # of unique articles
          numberOfUniqueArticlesFound++;
        }

        // try to retrieve the respective bucket for the article
        const relatedBucket =
          nestedListOfHitsByArticle[
            hashOfListOrderByArticle[
              currentHit['articlePath'] as keyof typeof hashOfListOrderByArticle
            ]
          ];

        if (relatedBucket) {
          // if it exists, store current hit into the bucket
          relatedBucket.push(currentHit);
        } else {
          // if it doesnt exists, create a new bucket for the article
          nestedListOfHitsByArticle[
            hashOfListOrderByArticle[
              currentHit['articlePath'] as keyof typeof hashOfListOrderByArticle
            ]
          ] = [currentHit];
        }
      }
    }

    nestedListOfHitsByArticle.map((hitsByArticle) => {
      return hitsByArticle.sort((a, b) => {
        return a['sectionOrder'] - b['sectionOrder'];
      });
    });

    const output = (
      /* eslint-disable react/jsx-no-useless-fragment */
      <>
        {nestedListOfHitsByArticle?.map((bucketOfHitsByArticle) => {
          const listOfHitsWithinArticle = bucketOfHitsByArticle.map((hit) => {
            orderNumberCount++;

            return (
              <Link
                href={hit['subsectionURL'] as string}
                onClick={navHandler}
                key={hit.objectID}
              >
                <li className={styles['searchResults-hit--subsection']}>
                  <div className={styles['searchResults-hit--order']}>
                    {orderNumberCount}
                  </div>
                  {hit['sectionTitle'] as string}
                </li>
              </Link>
            );
          });

          return (
            <li
              className={styles['searchResults-hit--bucket']}
              key={bucketOfHitsByArticle[0]['articleTitle']}
            >
              <Link
                href={bucketOfHitsByArticle[0]['articlePath'] as string}
                onClick={navHandler}
              >
                <div className={styles['searchResults-hit--article']}>
                  <div className={styles['searchResults-hit--article-bg']} />
                  {bucketOfHitsByArticle[0]['articleTitle']}
                </div>
              </Link>

              <ul className={styles['searchResults-hit--listOfSubsections']}>
                {listOfHitsWithinArticle}
              </ul>
            </li>
          );
        })}
      </>
    );

    return results?.query ? output : <></>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results]);

  return (
    <div
      className={
        'searchResultsContainer ' +
        styles['searchResultsContainer'] +
        (typeof results !== 'undefined' && results.query
          ? ' ' + styles['searchResultsContainer-active']
          : ' ')
      }
    >
      <div
        data-testid={'searchResults-hitsContainer--wrapper'}
        className={
          styles['searchResults-hitsContainer--wrapper'] +
          ((props.panelStates.searchPanelState.isOpen &&
            results?.hits?.length) ||
          (breakpointSwitch === 1 &&
            props.panelStates.sidebarState.isOpen &&
            results?.hits?.length)
            ? ' ' +
              styles['searchResults-hitsContainer--wrapper-open'] +
              ' searchResults-hitsContainer--wrapper-open '
            : ' ')
        }
      >
        <div
          className={styles['searchResults-hitsContainer--topBorderFrame']}
        />
        <div
          className={styles['searchResults-hitsContainer--bottomBorderFrame']}
        />
        <div
          className={
            styles['searchResults-hitsContainer'] +
            ' searchResults-hitsContainer'
          }
        >
          <ul className={styles['searchResults-hitsContainer--list']}>
            {ResultsListNested}
          </ul>
        </div>
      </div>
      {typeof results !== 'undefined' && results.query ? (
        <Pagination
          hitsPerPage={results?.hitsPerPage}
          isSearchPanelOpen={props.panelStates.searchPanelState.isOpen}
          toggleSearchPanel={props.panelStates.searchPanelState.queueNextState}
          isSidebarOpen={props.panelStates.sidebarState.isOpen || false}
          toggleSidebar={props.panelStates.sidebarState.queueNextState}
          testPagination={props.testInjection?.testPagination}
        />
      ) : (
        <>{''}</>
      )}
    </div>
  );
}
