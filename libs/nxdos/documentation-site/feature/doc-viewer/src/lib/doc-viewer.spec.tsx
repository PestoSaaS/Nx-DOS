import { act, render, screen } from '@testing-library/react';
import { DocViewer } from './doc-viewer';
import mockRouter from 'next-router-mock';
import { mockIntersectionObserver } from '@shared/util/testing';
import { userEvent } from '@testing-library/user-event';
import { ThemeContextProvider } from '@nxdos/documentation-site/ui/common';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('Nxdos - Documentation Site - Feature - Doc Viewer', () => {
  // Set the initial url:
  mockRouter.push('/introduction');
  mockIntersectionObserver();

  let baseElement: HTMLElement, asFragment: () => DocumentFragment;
  beforeEach(async () => {
    await act(() => {
      ({ baseElement, asFragment } = render(
        <ThemeContextProvider>
          <DocViewer
            menu={{ sections: [] }}
            sitemap={[]}
            frontMatterData={{
              title: 'Test document',
              timestamp: {
                created_at: '2023-02-08T05:35:07.322Z',
                last_updated_at: '2023-02-08T05:35:07.322Z',
              },
              author: {
                name: 'Test author',
              },
            }}
            renderedContentHTML={''}
            tocList={[]}
          />
        </ThemeContextProvider>
      ));
    });
  });

  it('should render search form successfully', async () => {
    expect(baseElement).toBeTruthy();
    const captionText = await screen.findByText('Nx starter guide', {
      exact: false,
    });
    expect(captionText).toBeTruthy();
  });

  it('should match snapshot correctly', () => {
    expect(asFragment()).toMatchSnapshot();
  });

  it('should execute a search query', async () => {
    const user = userEvent.setup();
    const searchField = await screen.findByPlaceholderText('search', {
      exact: false,
    });
    const query = 'algolia';
    await user.type(searchField, query);
    expect(searchField).toHaveProperty('value', query);
    const searchPagination = await screen.findByText(
      'search results',
      {
        exact: false,
      },
      { timeout: 3000 }
    );
    expect(searchPagination).toBeTruthy();
    const searchResultsClickZone = await screen.findByTestId(
      'searchResultsHeader--clickZone'
    );
    let searchPanelWrapper = await screen.findByTestId(
      'searchResults-hitsContainer--wrapper'
    );
    expect(
      searchPanelWrapper.className.includes(
        'searchResults-hitsContainer--wrapper-open'
      )
    ).toBeFalsy();
    await user.click(searchResultsClickZone);
    searchPanelWrapper = await screen.findByTestId(
      'searchResults-hitsContainer--wrapper'
    );
    expect(
      searchPanelWrapper.className.includes(
        'searchResults-hitsContainer--wrapper-open'
      )
    ).toBeTruthy();
    await user.click(searchResultsClickZone);
    expect(
      searchPanelWrapper.className.includes(
        'searchResults-hitsContainer--wrapper-open'
      )
    ).toBeFalsy();
  });

  it('should close overlapping panels before opening another', async () => {
    const user = userEvent.setup();
    const searchField = await screen.findByPlaceholderText('search', {
      exact: false,
    });
    const query = 'algolia';
    await user.type(searchField, query);
    expect(searchField).toHaveProperty('value', query);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 360));
    });
    const searchPagination = await screen.findByText(
      'search results',
      {
        exact: false,
      },
      { timeout: 3000 }
    );
    expect(searchPagination).toBeTruthy();
    const toggleOverviewPanelButton = (
      await screen.getAllByTestId('toggleOverviewPanelButton')
    )[0];
    const hitsContainerWrapper = (
      await screen.findAllByTestId('searchResults-hitsContainer--wrapper')
    )[0];
    expect(
      hitsContainerWrapper.className.includes(
        'searchResults-hitsContainer--wrapper-open'
      )
    ).toBeFalsy();
    await user.type(searchField, '{enter}');
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 360));
    });
    expect(
      hitsContainerWrapper.className.includes(
        'searchResults-hitsContainer--wrapper-open'
      )
    ).toBeTruthy();
    await user.click(toggleOverviewPanelButton);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 360));
    });
    expect(
      hitsContainerWrapper.className.includes(
        'searchResults-hitsContainer--wrapper-open'
      )
    ).toBeFalsy();
    await user.type(searchField, '{enter}');
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 360));
    });
    expect(
      hitsContainerWrapper.className.includes(
        'searchResults-hitsContainer--wrapper-open'
      )
    ).toBeTruthy();
  });
});
