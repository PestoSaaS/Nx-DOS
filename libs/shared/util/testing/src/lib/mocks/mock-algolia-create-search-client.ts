/**
 * Referenced from Algolia repo
 * https://github.com/algolia/react-instantsearch/tree/4ca71ce9e77df440482ce1356a5a6f1720af6d6c/test
 *
 */

/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  @nx/enforce-module-boundaries */

import { createNullCache } from '@algolia/cache-common';
import { createInMemoryCache } from '@algolia/cache-in-memory';
import {
  serializeQueryParameters,
  createTransporter,
  CallEnum,
  createUserAgent,
} from '@algolia/transporter';
import type { HostOptions } from '@algolia/transporter';
import { createNullLogger } from '@algolia/logger-common';
import { createNodeHttpRequester } from '@algolia/requester-node-http';
import algoliasearch from 'algoliasearch';
import {
  createSingleSearchResponse,
  createMultiSearchResponse,
  createSFFVResponse,
} from './mock-algolia-create-API-response';

type OverrideKeys<TTarget, TOptions> = TOptions extends Record<string, never>
  ? TTarget
  : Omit<TTarget, keyof TOptions> & TOptions;

type SearchClient = ReturnType<typeof algoliasearch>;

type MockSearchClient = OverrideKeys<
  SearchClient,
  {
    search: jest.Mock<any, any>;
    searchForFacetValues: jest.Mock<any, any>;
  }
>;

export function createSearchClient<TOptions extends Partial<SearchClient>>(
  options: TOptions
): OverrideKeys<MockSearchClient, TOptions> {
  const appId = (options as Record<string, unknown>).appId || 'appId';

  // check if algoliasearch is v4 (has transporter)
  if ('transporter' in algoliasearch('appId', 'apiKey')) {
    options = {
      transporter: createTransporter({
        timeouts: {
          connect: 2,
          read: 5,
          write: 30,
        },
        userAgent: createUserAgent('test'),
        requester: createNodeHttpRequester(),
        logger: createNullLogger(),
        responsesCache: createNullCache(),
        requestsCache: createNullCache(),
        hostsCache: createInMemoryCache(),
        hosts: (
          [
            { url: `${appId}-dsn.algolia.net`, accept: CallEnum.Read },
            { url: `${appId}.algolia.net`, accept: CallEnum.Write },
          ] as readonly HostOptions[]
        ).concat([
          { url: `${appId}-1.algolianet.com` },
          { url: `${appId}-2.algolianet.com` },
          { url: `${appId}-3.algolianet.com` },
        ]),
        headers: {},
        queryParameters: {},
      }),
      ...options,
    };
  } else {
    /* istanbul ignore next */
    options = {
      _ua: 'Algolia for JavaScript (test)',
      ...options,
    };
  }

  return {
    appId,
    addAlgoliaAgent: jest.fn(),
    clearCache: jest.fn(),
    initIndex: jest.fn(),
    customRequest: jest.fn(),
    search: jest.fn((requests) =>
      Promise.resolve(
        createMultiSearchResponse(
          ...requests.map((request) =>
            createSingleSearchResponse({
              index: request.indexName,
              params: serializeQueryParameters(request.params || {}),
            })
          )
        )
      )
    ),
    searchForFacetValues: jest.fn(
      /* istanbul ignore next */
      () => Promise.resolve([createSFFVResponse()])
    ),
    ...options,
  } as SearchClient as OverrideKeys<MockSearchClient, TOptions>;
}
