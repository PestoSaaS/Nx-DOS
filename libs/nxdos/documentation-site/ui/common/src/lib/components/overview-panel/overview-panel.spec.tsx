import { act, render, screen } from '@testing-library/react';
import { OverviewPanel } from './overview-panel.base';
import mockRouter from 'next-router-mock';
import userEvent from '@testing-library/user-event';
import { OVERVIEW_PANEL_PROPS__VIEW_BREAKPOINT_MAX_LG } from './overview-panel.view-breakpoint--max-lg';
import {
  mockIntersectionObserver,
  mock_panelStates,
} from '@shared/util/testing';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('Nxdos - Documentation Site - UI - Common - components, OverviewPanel', () => {
  let baseElement: HTMLElement, asFragment: () => DocumentFragment;
  // Set the initial url:
  mockRouter.push('/introduction');
  mockIntersectionObserver();
  const user = userEvent.setup();

  const mockTocList = [
    {
      sectionTitle: 'Documentation structure',
      anchorLink: 'documentation-structure',
      sectionInset: '',
      key: 0,
      sectionTag: '',
    },
    {
      sectionTitle: 'documents.json',
      anchorLink: 'code--docs-documents-json',
      sectionInset: '  ',
      key: 1,
      sectionTag: 'embeddedCode',
    },
    {
      sectionTitle: 'Markdown elements',
      anchorLink: 'markdown-elements',
      sectionInset: '  ',
      key: 2,
      sectionTag: '',
    },
  ];

  describe('template', () => {
    beforeEach(
      async () =>
        await act(() => {
          ({ baseElement, asFragment } = render(
            <OverviewPanel tocList={mockTocList} />
          ));
        })
    );

    it('should render OverviewPanel component successfully', async () => {
      expect(baseElement).toBeTruthy();
      const tocElement = await screen.findByText('documents.json', {
        exact: false,
      });
      expect(tocElement).toBeTruthy();
    });

    it('should match snapshot correctly', () => {
      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe('differing viewports', () => {
    const panelStates = mock_panelStates();
    beforeEach(
      async () =>
        await act(() => {
          ({ baseElement, asFragment } = render(
            <OVERVIEW_PANEL_PROPS__VIEW_BREAKPOINT_MAX_LG
              tocList={mockTocList}
              panelStates={panelStates}
            />
          ));
        })
    );

    it('should toggle panel successfully', async () => {
      const toggleOverviewPanelButton = await screen.findByTestId(
        'toggleOverviewPanelButton'
      );
      const toggleOverviewPanelButton_alternate = await screen.findByTestId(
        'toggleOverviewPanelButton_alternate'
      );
      expect(panelStates.overviewPanelState.isOpen).toBeFalsy();
      await user.click(toggleOverviewPanelButton);
      expect(panelStates.overviewPanelState.isOpen).toBeTruthy();
      await user.click(toggleOverviewPanelButton_alternate);
      expect(panelStates.overviewPanelState.isOpen).toBeFalsy();
      panelStates.sidebarState.isOpen = true;
      await user.click(toggleOverviewPanelButton);
      expect(panelStates.overviewPanelState.isOpen).toBeTruthy();
      await user.click(toggleOverviewPanelButton_alternate);
      await new Promise((resolve) => setTimeout(resolve, 260));
      expect(panelStates.overviewPanelState.isOpen).toBeFalsy();
      panelStates.searchPanelState.isOpen = true;
      await user.click(toggleOverviewPanelButton);
      expect(panelStates.overviewPanelState.isOpen).toBeTruthy();
      await user.click(toggleOverviewPanelButton_alternate);
      expect(panelStates.overviewPanelState.isOpen).toBeFalsy();
    });

    it('should close panel upon clicking the background overlay', async () => {
      const overviewPanelOverlayBg = await screen.findByTestId(
        'overviewPanelOverlayBg'
      );
      expect(overviewPanelOverlayBg).toBeTruthy();
      panelStates.overviewPanelState.isOpen = true;
      await user.click(overviewPanelOverlayBg);
      expect(panelStates.overviewPanelState.isOpen).toBeFalsy();
    });
  });
});
