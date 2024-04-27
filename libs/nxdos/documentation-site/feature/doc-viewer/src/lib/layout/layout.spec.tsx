import { act, render, screen } from '@testing-library/react';
import { AppLayout } from './layout';
import {
  Article,
  ThemeContextProvider,
} from '@nxdos/documentation-site/ui/common';
import userEvent from '@testing-library/user-event';
import {
  mockIntersectionObserver,
  sample_ArticleProps,
  mock_panelStates,
} from '@shared/util/testing';

jest.mock('next/router', () => ({
  useRouter: () => {
    return {
      asPath: '/getting-started',
      query: { segments: ['getting-started'] },
    };
  },
}));

describe('Nxdos - Documentation Site - UI - Common - components, AppLayout', () => {
  let baseElement: HTMLElement, asFragment: () => DocumentFragment;
  const user = userEvent.setup();
  mockIntersectionObserver();

  let panelStates: ReturnType<typeof mock_panelStates>;

  const mock_menu = {
    sections: [
      {
        name: 'Nx-DOS',
        path: 'nxdos',
        isFolder: true,
        itemList: [
          {
            name: 'introduction',
            path: 'nxdos/introduction',
            overrideURL: 'introduction',
          },
          {
            name: 'configuration',
            path: 'nxdos/configuration',
            isFolder: true,
            itemList: [
              {
                name: 'documentation',
                path: 'nxdos/configuration/documentation',
                overrideURL: 'configuration/documentation',
              },
              {
                name: 'usage-metrics',
                path: 'nxdos/configuration/usage-metrics',
                overrideURL: 'configuration/usage-metrics',
              },
            ],
          },
        ],
      },
    ],
  };

  beforeEach(
    async () =>
      await act(() => {
        panelStates = mock_panelStates();
        ({ baseElement, asFragment } = render(
          <ThemeContextProvider>
            <AppLayout menu={mock_menu} panelStates={panelStates}>
              <Article {...sample_ArticleProps} panelStates={panelStates} />
            </AppLayout>
          </ThemeContextProvider>
        ));
      })
  );

  it('should render AppLayout component successfully', async () => {
    expect(baseElement).toBeTruthy();
    const sidebarCaption = await screen.findByText('Nx starter guide', {
      exact: false,
    });
    expect(sidebarCaption).toBeTruthy();
  });

  it('should match snapshot correctly', () => {
    expect(asFragment()).toMatchSnapshot();
  });

  it('should drape an overlay behind open panels and close on click', async () => {
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
    const panelOverlayClickHandler = (
      await screen.findAllByTestId('panelOverlayClickHandler')
    )[0];
    const panelOverlayClickHandler_smallViewport = (
      await screen.findAllByTestId('panelOverlayClickHandler_alt')
    )[0];
    expect(panelStates.searchPanelState.isOpen).toBeTruthy();
    await user.click(panelOverlayClickHandler);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 360));
    });
    expect(panelStates.searchPanelState.isOpen).toBeFalsy();
    await user.type(searchField, '{enter}');
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 360));
    });
    expect(panelStates.searchPanelState.isOpen).toBeTruthy();
    await user.click(panelOverlayClickHandler_smallViewport);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 360));
    });
    expect(panelStates.searchPanelState.isOpen).toBeFalsy();
  });
});
