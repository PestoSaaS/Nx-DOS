/**
 * Referenced from Algolia repo
 * https://github.com/algolia/react-instantsearch/tree/4ca71ce9e77df440482ce1356a5a6f1720af6d6c/test
 *
 */

import React from 'react';
import { InstantSearch } from 'react-instantsearch';

import { createSearchClient } from './mock-algolia-create-search-client';

import type { InstantSearchProps } from 'react-instantsearch';

const searchClient = createSearchClient({});

type InstantSearchHooksTestWrapperProps = {
  children: React.ReactNode;
} & Partial<InstantSearchProps>;

export const InstantSearchHooksTestWrapper = ({
  children,
  ...props
}: InstantSearchHooksTestWrapperProps) => {
  return (
    <InstantSearch searchClient={searchClient} indexName="indexName" {...props}>
      {children}
    </InstantSearch>
  );
};
