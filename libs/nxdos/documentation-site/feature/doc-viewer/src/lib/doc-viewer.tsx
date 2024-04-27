import {
  DocumentData,
  TocItemMeta,
} from '@nxdos/documentation-site/models/document';
import { Menu, MenuItem } from '@nxdos/documentation-site/models/menu';
import { Article, useThemeContext } from '@nxdos/documentation-site/ui/common';
import { AppLayout } from './layout/layout';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

/* eslint-disable-next-line */
export interface DocViewerProps {
  menu: Menu;
  sitemap: MenuItem[];
  frontMatterData: DocumentData['frontMatterData'];
  renderedContentHTML: string;
  tocList: TocItemMeta[];
}

export function DocViewer(props: DocViewerProps) {
  const themeState = useThemeContext();
  const [isSidebarOpen, setSidebarState] = useState(false);
  const [isSearchPanelOpen, setSearchPanelState] = useState(false);
  const [isOverviewPanelOpen, setOverviewPanelState] = useState(false);

  const router = useRouter();

  const queueSearchPanelState = ((isPanelQueuedToOpen: boolean) => {
    if (isPanelQueuedToOpen && isOverviewPanelOpen) {
      queueOverviewPanelState(false);

      setTimeout(() => {
        if (!isSidebarOpen) {
          setSidebarState(true);
        }
        setSearchPanelState(isPanelQueuedToOpen);
      }, 100);
    } else {
      if (!isSidebarOpen && isPanelQueuedToOpen) {
        setSidebarState(true);
      }
      setSearchPanelState(isPanelQueuedToOpen);
    }
  }) as Dispatch<SetStateAction<boolean>>;

  const queueOverviewPanelState = ((isPanelQueuedToOpen: boolean) => {
    if (isPanelQueuedToOpen && isSearchPanelOpen) {
      queueSearchPanelState(false);
      setTimeout(() => {
        setOverviewPanelState(isPanelQueuedToOpen);
      }, 100);
    } else {
      setOverviewPanelState(isPanelQueuedToOpen);
    }
  }) as Dispatch<SetStateAction<boolean>>;

  const panelStates = {
    sidebarState: {
      isOpen: isSidebarOpen,
      queueNextState: setSidebarState,
    },
    searchPanelState: {
      isOpen: isSearchPanelOpen,
      queueNextState: queueSearchPanelState,
    },
    overviewPanelState: {
      isOpen: isOverviewPanelOpen,
      queueNextState: queueOverviewPanelState,
    },
  };

  useEffect(() => {
    const appWrapper = document.getElementsByClassName('appWrapper')[0];
    const breakpointSwitchFromDom = getComputedStyle(
      appWrapper
    ).getPropertyValue('--view-breakpoint-switch-sm');

    if (Number(breakpointSwitchFromDom) !== 1) {
      panelStates.sidebarState.queueNextState(true);
    }

    /* istanbul ignore next */
    const handleRouteChange = () => {
      document
        .getElementById('tocFrame')
        ?.scroll({ top: 0, left: 0, behavior: 'instant' });
      document
        .getElementById('scrollFrame')
        ?.scroll({ top: 0, left: 0, behavior: 'instant' });
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <style>
        {themeState.getColorThemeStyles(
          themeState.selectedThemes?.defaultTheme
        )}
      </style>

      <AppLayout menu={props.menu} panelStates={panelStates}>
        <Article
          frontMatterData={props.frontMatterData}
          renderedContentHTML={props.renderedContentHTML}
          sitemap={props.sitemap}
          tocList={props.tocList}
          panelStates={panelStates}
        />
      </AppLayout>
    </>
  );
}

export default DocViewer;
