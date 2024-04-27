import { PropsWithChildren } from 'react';
import algoliasearch, { SearchClient } from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch';

let searchClient: SearchClient;

if (
  process.env['NEXT_PUBLIC_ALGOLIA_PROJECT_APP_ID'] &&
  process.env['NEXT_PUBLIC_ALGOLIA_PROJECT_SEARCH_ONLY_API_KEY']
) {
  searchClient = algoliasearch(
    process.env['NEXT_PUBLIC_ALGOLIA_PROJECT_APP_ID'],
    process.env['NEXT_PUBLIC_ALGOLIA_PROJECT_SEARCH_ONLY_API_KEY']
  );
}

export function InstantSearchWrapper(props: PropsWithChildren): JSX.Element {
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName="nxdos_docs"
      future={{
        preserveSharedStateOnUnmount: true,
      }}
    >
      {props.children}
    </InstantSearch>
  ) as JSX.Element;
}
