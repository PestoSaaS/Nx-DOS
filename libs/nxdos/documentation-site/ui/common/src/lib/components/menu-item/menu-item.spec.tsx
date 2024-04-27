import { act, render, screen } from '@testing-library/react';
import { NavMenuItem } from './menu-item';
import mockRouter from 'next-router-mock';
import { CSSProperties } from 'react';
import userEvent from '@testing-library/user-event';
import { mock_panelStates, sample_MenuProps } from '@shared/util/testing';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('Nxdos - Documentation Site - UI - Common - components, MenuItem', () => {
  let baseElement: HTMLElement, asFragment: () => DocumentFragment;
  // Set the initial url:
  mockRouter.push('/introduction');
  const user = userEvent.setup();

  describe('large viewport', () => {
    const panelStates = mock_panelStates();

    beforeEach(
      async () =>
        await act(() => {
          ({ baseElement, asFragment } = render(
            <div
              className="appWrapper"
              style={{ '--view-breakpoint-switch-sm': 0 } as CSSProperties}
            >
              <NavMenuItem
                item={sample_MenuProps}
                setSidebarState={panelStates.sidebarState.queueNextState}
                setOverviewPanelState={
                  panelStates.overviewPanelState.queueNextState
                }
                toggleSearchPanel={panelStates.searchPanelState.queueNextState}
                isSearchPanelOpen={panelStates.searchPanelState.isOpen}
              />
            </div>
          ));
        })
    );

    it('should render MenuItem component successfully', async () => {
      expect(baseElement).toBeTruthy();
      const itemLabel = await screen.findByText(sample_MenuProps.name, {
        exact: false,
      });
      expect(itemLabel).toBeTruthy();
    });

    it('should match snapshot correctly', () => {
      expect(asFragment()).toMatchSnapshot();
    });

    it('should navigate on click and close any open panels', async () => {
      const targetLink = sample_MenuProps.itemList[1];
      const targetPath = targetLink.overrideURL
        ? targetLink.overrideURL
        : targetLink.path;

      panelStates.searchPanelState.isOpen = true;
      const navItem = await screen.findByTestId(
        'nav-clickHandler-' + targetPath
      );
      expect(panelStates.searchPanelState.isOpen).toBeTruthy();
      expect(navItem.getAttribute('href')).toEqual(targetPath);
      navItem.removeAttribute('href');
      user.click(navItem);
      await new Promise((resolve) => setTimeout(resolve, 350));
      mockRouter.events.emit('routeChangeStart');
      await new Promise((resolve) => setTimeout(resolve, 350));
      expect(panelStates.searchPanelState.isOpen).toBeFalsy();
    });
  });

  describe('small viewport', () => {
    const panelStates = mock_panelStates();

    beforeEach(
      async () =>
        await act(() => {
          ({ baseElement, asFragment } = render(
            <div
              className="appWrapper"
              style={{ '--view-breakpoint-switch-sm': 1 } as CSSProperties}
            >
              <NavMenuItem
                item={sample_MenuProps}
                setSidebarState={panelStates.sidebarState.queueNextState}
                setOverviewPanelState={
                  panelStates.overviewPanelState.queueNextState
                }
                toggleSearchPanel={panelStates.searchPanelState.queueNextState}
                isSearchPanelOpen={panelStates.searchPanelState.isOpen}
              />
            </div>
          ));
        })
    );

    it('should also close sidebar on click along with other panels', async () => {
      const targetLink = sample_MenuProps.itemList[1];
      const targetPath = targetLink.overrideURL
        ? targetLink.overrideURL
        : targetLink.path;
      panelStates.sidebarState.isOpen = true;
      const navItem = await screen.findByTestId(
        'nav-clickHandler-' + targetPath
      );
      expect(navItem.getAttribute('href')).toEqual(targetPath);
      navItem.removeAttribute('href');
      user.click(navItem);
      await new Promise((resolve) => setTimeout(resolve, 350));
      mockRouter.events.emit('routeChangeStart');
      await new Promise((resolve) => setTimeout(resolve, 350));
      expect(panelStates.sidebarState.isOpen).toBeFalsy();
    });
  });
});
