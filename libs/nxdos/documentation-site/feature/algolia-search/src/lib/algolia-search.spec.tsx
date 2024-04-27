import { act, fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { SearchField, SearchResults } from '../';

import mockRouter from 'next-router-mock';
import { CSSProperties } from 'react';
import {
  InstantSearchHooksTestWrapper,
  useMockAlgoliaPaginationHook,
  sample_AlgoliaSearchResults,
  mock_panelStates,
} from '@shared/util/testing';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('Nxdos - Documentation Site - Feature - Algolia Search', () => {
  // Set the initial url:
  mockRouter.push('/introduction');
  const user = userEvent.setup();

  let baseElement: HTMLElement, asFragment: () => DocumentFragment;
  let panelStates: ReturnType<typeof mock_panelStates>;

  beforeEach(async () => {
    panelStates = mock_panelStates();
    await act(() => {
      ({ baseElement, asFragment } = render(
        <InstantSearchHooksTestWrapper>
          <div
            className="appWrapper"
            style={{ '--view-breakpoint-switch-sm': 1 } as CSSProperties}
          >
            <SearchField panelStates={panelStates} />
            <SearchResults
              panelStates={panelStates}
              testInjection={{
                testResults: sample_AlgoliaSearchResults,
                testPagination: useMockAlgoliaPaginationHook,
              }}
            />
          </div>
        </InstantSearchHooksTestWrapper>
      ));
    });
  });

  it('should render search components successfully', async () => {
    expect(baseElement).toBeTruthy();
    const searchField = await screen.findByPlaceholderText('search', {
      exact: false,
    });
    expect(searchField).toBeTruthy();
  });

  it('should match snapshot correctly', () => {
    expect(asFragment()).toMatchSnapshot();
  });

  it('should allow for input of a search query', async () => {
    const searchField = await screen.findByPlaceholderText('search', {
      exact: false,
    });
    const query = 'algolia';
    await user.type(searchField, query);
    expect(searchField).toHaveProperty('value', query);
  });

  it('should successfully display pagination and clear button', async () => {
    const searchField = await screen.findByPlaceholderText('search', {
      exact: false,
    });
    const paginationClearButton = (
      await screen.findAllByTestId('searchResults--clearButton')
    )[0];
    expect(paginationClearButton).toBeDefined();
    await user.type(searchField, 'test{enter}');
    await new Promise((resolve) => setTimeout(resolve, 50));
    await user.click(paginationClearButton);
    await act(
      async () => await new Promise((resolve) => setTimeout(resolve, 260))
    );
    expect(searchField).toHaveProperty('value', '');
  });

  it('should successfully change pagination', async () => {
    const searchField = await screen.findByPlaceholderText('search', {
      exact: false,
    });
    const query = 'algo';
    await user.type(searchField, query);

    const previousPageButton = screen.queryAllByTestId(
      'searchResultsPagination--previousPageButton'
    )[0];
    const nextPageButton = screen.queryAllByTestId(
      'searchResultsPagination--nextPageButton'
    )[0];
    expect(previousPageButton).toBeDefined();
    expect(nextPageButton).toBeDefined();

    const parseIndicators = () => {
      const firstPageIndicator = screen.queryAllByTestId(
        'searchResultsPagination--firstPageIndicator'
      )[0];
      const lastPageIndicator = screen.queryAllByTestId(
        'searchResultsPagination--lastPageIndicator'
      )[0];

      return {
        firstPageIndicator: firstPageIndicator,
        lastPageIndicator: lastPageIndicator,
      };
    };

    let indicators = parseIndicators();
    expect(indicators.firstPageIndicator).toBeDefined();
    expect(indicators.lastPageIndicator).not.toBeDefined();

    await user.click(nextPageButton);
    indicators = parseIndicators();
    expect(indicators.firstPageIndicator).not.toBeDefined();
    expect(indicators.lastPageIndicator).not.toBeDefined();

    await user.click(nextPageButton);
    indicators = parseIndicators();
    expect(indicators.firstPageIndicator).not.toBeDefined();
    expect(indicators.lastPageIndicator).toBeDefined();

    await user.click(previousPageButton);
    indicators = parseIndicators();
    expect(indicators.firstPageIndicator).not.toBeDefined();
    expect(indicators.lastPageIndicator).not.toBeDefined();

    await user.click(previousPageButton);
    indicators = parseIndicators();
    expect(indicators.firstPageIndicator).toBeDefined();
    expect(indicators.lastPageIndicator).not.toBeDefined();
  });

  it('should successfully display results on submit', async () => {
    const searchField = await screen.findByPlaceholderText('search', {
      exact: false,
    });
    const query = 'algolia';
    expect(panelStates.searchPanelState.isOpen).toBeFalsy();
    await user.type(searchField, query);
    expect(searchField).toHaveProperty('value', query);
    await act(async () =>
      fireEvent.submit(document.getElementsByClassName('searchField')[0])
    );
    await new Promise((resolve) => setTimeout(resolve, 360));
    expect(panelStates.searchPanelState.isOpen).toBeTruthy();
    const searchResult = await screen.findAllByText(
      'Simple search integration using Algolia'
    );
    expect(searchResult[0]).toBeDefined();
  });

  it('should toggle panel on resubmits while a query is present', async () => {
    const searchField = await screen.findByPlaceholderText('search', {
      exact: false,
    });
    const query = 'algolia';

    expect(panelStates.searchPanelState.isOpen).toBeFalsy();
    await user.type(searchField, '{enter}');
    expect(panelStates.searchPanelState.isOpen).toBeFalsy();
    await user.type(searchField, query);
    await new Promise((resolve) => setTimeout(resolve, 50));
    await user.type(searchField, '{enter}');
    await new Promise((resolve) => setTimeout(resolve, 360));
    expect(searchField).toHaveProperty('value', query);
    expect(panelStates.searchPanelState.isOpen).toBeTruthy();
    const searchResult = await screen.findAllByText(
      'Simple search integration using Algolia'
    );
    expect(searchResult[0]).toBeDefined();
    await user.type(searchField, '{enter}');
    await new Promise((resolve) => setTimeout(resolve, 360));
    expect(panelStates.searchPanelState.isOpen).toBeFalsy();
  });
});
