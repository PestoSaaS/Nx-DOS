import { usePagination, useSearchBox } from 'react-instantsearch';
import styles from './search-results.module.css';

interface SearchPaginationProps {
  hitsPerPage: number;
  isSearchPanelOpen: boolean;
  toggleSearchPanel: (isPanelQueuedToOpen: boolean) => void;
  isSidebarOpen: boolean;
  toggleSidebar: (isPanelQueuedToOpen: boolean) => void;
  testPagination?: () => {
    currentRefinement: number;
    nbHits: number;
    nbPages: number;
    refine: (page: number) => void;
  };
}

export function Pagination(props: SearchPaginationProps) {
  const { currentRefinement, nbHits, nbPages, refine } = props.testPagination
    ? props.testPagination()
    : // eslint-disable-next-line react-hooks/rules-of-hooks
      usePagination();
  const { clear: clearSearchField } = useSearchBox();

  const clearSearch = () => {
    props.toggleSearchPanel(false);
    setTimeout(() => {
      clearSearchField();
    }, 100);
  };

  return (
    <div
      className={
        styles['searchResultsHeaderContainer'] +
        ' searchResultsHeaderContainer ' +
        (props.isSearchPanelOpen
          ? ' ' + styles['searchResultsHeaderContainer--open']
          : '')
      }
    >
      <div
        data-testid={'searchResultsHeader--clickZone'}
        className={
          styles['searchResultsHeaderContainer--clickZone'] +
          ' sm:!right-[5ch] ' +
          (!props.isSidebarOpen ? ' max-sm:!right-[5ch]' : '')
        }
        onClick={() => {
          const source = document.getElementsByClassName('appWrapper')[0];
          const breakpointSwitch = Number(
            getComputedStyle(source).getPropertyValue(
              '--view-breakpoint-switch-sm'
            )
          );
          if (breakpointSwitch === 1 && props.isSidebarOpen) {
            props.toggleSidebar(false);
          } else {
            props.toggleSearchPanel(!props.isSearchPanelOpen);
          }
        }}
      />

      <span
        className={
          (props.isSidebarOpen ? 'max-sm:!hidden ' : '') +
          (nbHits === 0 ? ' !opacity-0 ![pointer-events:none] ' : '') +
          styles['searchResultsDropdownBullet']
        }
      >
        {nbHits > 0 ? '\u25BC' : ':'}
      </span>

      <span
        className={
          (props.isSidebarOpen ? 'max-sm:!hidden ' : '') +
          (nbHits > 0 ? ' sm:!opacity-0 sm:![pointer-events:none] ' : '') +
          styles['searchResults--noResultsBullet']
        }
      >
        {nbHits > 0 ? '' : '-'}
      </span>

      {nbHits > 0 && (
        <span
          className={
            styles['searchResultsPaginationFrame'] +
            '  ' +
            (currentRefinement === 0
              ? ' ' + styles['searchResultsPagination--firstPage']
              : ' ') +
            (currentRefinement === nbPages - 1
              ? ' ' + styles['searchResultsPagination--lastPage']
              : ' ')
          }
          {...(typeof props.testPagination !== 'undefined' &&
          currentRefinement === 0
            ? { 'data-testid': 'searchResultsPagination--firstPageIndicator' }
            : {})}
          {...(typeof props.testPagination !== 'undefined' &&
          currentRefinement === nbPages - 1
            ? { 'data-testid': 'searchResultsPagination--lastPageIndicator' }
            : {})}
        >
          <span
            className={
              styles['searchResultsPagination'] +
              (currentRefinement !== 0 ? ' !ml-[-0.925ch] ' : ' ')
            }
          >
            {nbPages > 1 && (
              <div
                className={styles['searchResultsPagination--prevPage']}
                data-testid={'searchResultsPagination--previousPageButton'}
                onClick={(event) => {
                  event.preventDefault();
                  refine(currentRefinement >= 1 ? currentRefinement - 1 : 0);
                }}
              >
                {'<'}
              </div>
            )}

            <span
              className={
                'max-sm:hidden ' + (!props.isSidebarOpen ? '!block' : '')
              }
            >
              <span className={styles['searchResultsPagination--number']}>
                {1 + props.hitsPerPage * currentRefinement}
              </span>
              <span className={styles['searchResultsPagination--separator']}>
                -
              </span>
              <span className={styles['searchResultsPagination--number']}>
                {currentRefinement + 1 === nbPages
                  ? nbHits
                  : props.hitsPerPage * (currentRefinement + 1)}
              </span>
            </span>

            {props.isSidebarOpen && (
              <span
                className={
                  'sm:hidden ' + styles['searchResultsPagination--number']
                }
              >
                page&nbsp;
                <span
                  className={
                    styles['searchResultsPagination--separator'] +
                    ' ' +
                    styles['searchResultsPagination--separator--alt']
                  }
                >
                  #
                </span>
                {currentRefinement + 1}
              </span>
            )}

            {nbPages > 1 && (
              <div
                className={styles['searchResultsPagination--nextPage']}
                data-testid={'searchResultsPagination--nextPageButton'}
                onClick={(event) => {
                  event.preventDefault();
                  refine(
                    currentRefinement <= nbPages - 2
                      ? currentRefinement + 1
                      : nbPages - 1
                  );
                }}
              >
                {'>'}
              </div>
            )}
          </span>
          <span className={styles['searchResultsPagination--numberCaption']}>
            &nbsp;of&nbsp;
          </span>
        </span>
      )}

      <span
        className={
          styles['searchResultsPagination--numberCaption--alt'] +
          ' ' +
          (props.isSidebarOpen ? 'max-sm:w-0 ' : ' ') +
          (props.isSidebarOpen ? 'max-sm:opacity-0' : ' ')
        }
      >
        <span className={styles['searchResultsPagination--number']}>
          {nbHits}
        </span>
        &nbsp;search results
        {nbHits > 0 && (
          <span data-testid={'hitsIndicator'} className={'hitsIndicator'} />
        )}
      </span>
      {props.isSidebarOpen && (
        <span
          className={
            'sm:hidden ' +
            styles['searchResultsPagination--number'] +
            ' ' +
            styles['searchResultsPagination--pgNumber']
          }
        >
          {props.isSearchPanelOpen ? (
            <>
              {nbPages + (nbPages === 0 ? ' results' : '')}
              {nbHits > 0 && <span className={'hitsIndicator'} />}
            </>
          ) : nbHits === 0 ? (
            <>
              <span className={styles['searchResultsPagination--number']}>
                {nbHits}
              </span>
              &nbsp;results
            </>
          ) : (
            // eslint-disable-next-line react/jsx-no-useless-fragment
            <></>
          )}
        </span>
      )}

      <span
        className={props.isSidebarOpen && nbHits > 0 ? 'max-sm:hidden' : ''}
        data-testid={'searchResults--clearButton'}
        onClick={() => {
          clearSearch();
        }}
      >
        {nbHits === 0 && (
          <span className={styles['searchResults--clearButtonFlap']} />
        )}
        <svg
          className={styles['searchResults--clearButton']}
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z"></path>
        </svg>
      </span>
    </div>
  );
}
