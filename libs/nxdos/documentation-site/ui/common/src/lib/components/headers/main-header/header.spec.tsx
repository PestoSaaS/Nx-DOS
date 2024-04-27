import { act, render, screen } from '@testing-library/react';
import { Header } from './header';
import {
  InstantSearchHooksTestWrapper,
  mock_panelStates,
} from '@shared/util/testing';
import { userEvent } from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
import { CSSProperties } from 'react';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('Nxdos - Documentation Site - UI - Common - components, Header', () => {
  let baseElement: HTMLElement, asFragment: () => DocumentFragment;
  // Set the initial url:
  mockRouter.push('/introduction');
  const user = userEvent.setup();

  let panelStates: ReturnType<typeof mock_panelStates>;

  describe('large viewport', () => {
    beforeEach(
      async () =>
        await act(() => {
          panelStates = mock_panelStates();
          ({ baseElement, asFragment } = render(
            <InstantSearchHooksTestWrapper>
              <div
                className={'appWrapper'}
                style={{ '--view-breakpoint-switch-sm': 0 } as CSSProperties}
              >
                <Header panelStates={panelStates} />
              </div>
            </InstantSearchHooksTestWrapper>
          ));
        })
    );

    it('should render Header component successfully', async () => {
      expect(baseElement).toBeTruthy();
      const breadCrumbLabel = await screen.findByText('introduction', {
        exact: false,
      });
      expect(breadCrumbLabel).toBeTruthy();
    });

    it('should toggle sidebar on click', async () => {
      expect(baseElement).toBeTruthy();
      const breadCrumbLabel = await screen.findByText('introduction', {
        exact: false,
      });
      expect(panelStates.sidebarState.isOpen).toBeFalsy();
      await user.click(breadCrumbLabel);
      expect(panelStates.sidebarState.isOpen).toBeTruthy();
    });

    it('should match snapshot correctly', () => {
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('small viewport', () => {
    beforeEach(
      async () =>
        await act(() => {
          panelStates = mock_panelStates();
          ({ baseElement, asFragment } = render(
            <InstantSearchHooksTestWrapper>
              <div
                className={'appWrapper'}
                style={{ '--view-breakpoint-switch-sm': 1 } as CSSProperties}
              >
                <Header panelStates={panelStates} />
              </div>
            </InstantSearchHooksTestWrapper>
          ));
        })
    );

    it('should toggle sidebar with alternate function', async () => {
      expect(baseElement).toBeTruthy();
      const headerClickHandler = await screen.findByTestId(
        'headerClickHandler'
      );
      expect(panelStates.sidebarState.isOpen).toBeFalsy();
      await user.click(headerClickHandler);
      await new Promise((resolve) => setTimeout(resolve, 260));
      expect(panelStates.sidebarState.isOpen).toBeTruthy();
    });

    it('should close open overview panels before opening sidebar', async () => {
      panelStates.overviewPanelState.isOpen = true;
      expect(baseElement).toBeTruthy();
      const headerClickHandler = await screen.findByTestId(
        'headerClickHandler'
      );
      expect(panelStates.sidebarState.isOpen).toBeFalsy();
      await user.click(headerClickHandler);
      expect(panelStates.sidebarState.isOpen).toBeFalsy();
      await new Promise((resolve) => setTimeout(resolve, 260));
      expect(panelStates.sidebarState.isOpen).toBeTruthy();
    });
  });
});
