/**
 * Referenced from Algolia repo
 * https://github.com/algolia/react-instantsearch/tree/4ca71ce9e77df440482ce1356a5a6f1720af6d6c/test
 *
 */

/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  @nx/enforce-module-boundaries */

import type algoliasearch from 'algoliasearch/lite';
import type * as AlgoliaSearch from 'algoliasearch/lite';
import type * as ClientSearch from '@algolia/client-search';

/** @ts-expect-error force Response type */
type SearchResponseV3<TObject> = AlgoliaSearch.Response<TObject>;
type SearchResponseV4<TObject> = ClientSearch.SearchResponse<TObject>;

type SearchForFacetValuesResponseV3 =
  /** @ts-expect-error force Response type */
  AlgoliaSearch.SearchForFacetValues.Response;
type SearchForFacetValuesResponseV4 = ClientSearch.SearchForFacetValuesResponse;

type DummySearchClientV4 = {
  readonly transporter: any;
};

type DefaultSearchClient = ReturnType<typeof algoliasearch>;

type SearchResponse<THit> = DefaultSearchClient extends DummySearchClientV4
  ? SearchResponseV4<THit>
  : SearchResponseV3<THit>;

type SearchForFacetValuesResponse =
  DefaultSearchClient extends DummySearchClientV4
    ? SearchForFacetValuesResponseV4
    : SearchForFacetValuesResponseV3;

export function createSingleSearchResponse<THit = any>(
  options: Partial<SearchResponse<THit>> = {}
): SearchResponse<THit> {
  const {
    query = '',
    page = 0,
    hitsPerPage = 20,
    hits = [],
    nbHits = hits.length,
    nbPages = Math.ceil(nbHits / hitsPerPage),
    params = '',
    exhaustiveNbHits = true,
    exhaustiveFacetsCount = true,
    processingTimeMS = 0,
    renderingContent = {
      facetOrdering: {
        facets: {
          order: ['brand', 'hierarchicalCategories.lvl0', 'categories'],
        },
        values: {
          brand: {
            sortRemainingBy: 'count',
          },
          categories: {
            sortRemainingBy: 'count',
          },
          'hierarchicalCategories.lvl0': {
            sortRemainingBy: 'count',
          },
        },
      },
    },
    userData = [
      {
        title: 'Banner title',
        banner: 'https://banner.jpg',
        link: 'https://banner.com/link/',
      },
    ],
    ...rest
  } = options;

  return {
    page,
    hitsPerPage,
    nbHits,
    nbPages,
    processingTimeMS,
    hits,
    query,
    params,
    exhaustiveNbHits,
    exhaustiveFacetsCount,
    renderingContent,
    userData,
    ...rest,
  };
}

type MultiResponse<THit = any> = {
  results: Array<SearchResponse<THit>>;
};

/* istanbul ignore next */
export function createMultiSearchResponse<THit = any>(
  ...args: Array<Partial<SearchResponse<THit>>>
): MultiResponse {
  if (!args.length) {
    return {
      results: [createSingleSearchResponse()],
    };
  }

  return {
    results: args.map(createSingleSearchResponse),
  };
}

/* istanbul ignore next */
export function createSFFVResponse(
  options: Partial<SearchForFacetValuesResponse> = {}
): SearchForFacetValuesResponse {
  return {
    facetHits: [],
    exhaustiveFacetsCount: true,
    processingTimeMS: 1,
    ...options,
  };
}
