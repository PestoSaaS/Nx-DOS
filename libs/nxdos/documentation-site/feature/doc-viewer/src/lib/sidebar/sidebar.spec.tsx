import { act, render, screen } from '@testing-library/react';
import { Sidebar } from './sidebar';
import mockRouter from 'next-router-mock';
import { Dispatch, SetStateAction } from 'react';
import userEvent from '@testing-library/user-event';
import { InstantSearchHooksTestWrapper } from '@shared/util/testing';
import { ThemeContextProvider } from '@nxdos/documentation-site/ui/common';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('Nxdos - Documentation Site - UI - Common - components, Sidebar', () => {
  let baseElement: HTMLElement, asFragment: () => DocumentFragment;
  // Set the initial url:
  mockRouter.push('/introduction');

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

  const mock_panelStates = {
    sidebarState: {
      isOpen: false,
      queueNextState: ((queuedState: boolean) => {
        mock_panelStates.sidebarState.isOpen = queuedState;
      }) as Dispatch<SetStateAction<boolean>>,
    },
    searchPanelState: {
      isOpen: false,
      queueNextState: () => {
        return;
      },
    },
    overviewPanelState: {
      isOpen: false,
      queueNextState: () => {
        return;
      },
    },
  };

  beforeEach(
    async () =>
      await act(() => {
        ({ baseElement, asFragment } = render(
          <ThemeContextProvider>
            <InstantSearchHooksTestWrapper>
              <Sidebar menu={mock_menu} panelStates={mock_panelStates} />
            </InstantSearchHooksTestWrapper>
          </ThemeContextProvider>
        ));
      })
  );

  it('should render Sidebar component successfully', async () => {
    expect(baseElement).toBeTruthy();
    const menuItem = await screen.findByText('usage-metrics', {
      exact: false,
    });
    expect(menuItem).toBeTruthy();
  });

  it('should hide or reveal subfolders upon click', async () => {
    const user = userEvent.setup();

    const menuFolderLabel = await screen.findByText('configuration', {
      exact: false,
    });
    // eslint-disable-next-line  @typescript-eslint/no-non-null-asserted-optional-chain
    const menuFolder = menuFolderLabel.parentElement
      ?.parentElement as HTMLElement;

    expect(menuFolder.className.includes('folder--open')).toBeTruthy();
    expect(menuFolder.className.includes('folder--closed')).toBeFalsy();
    await user.click(menuFolder);
    expect(menuFolder.className.includes('folder--open')).toBeFalsy();
    expect(menuFolder.className.includes('folder--closed')).toBeTruthy();
    await user.click(menuFolder);
    expect(menuFolder.className.includes('folder--open')).toBeTruthy();
    expect(menuFolder.className.includes('folder--closed')).toBeFalsy();
  });

  it('should match snapshot correctly', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
