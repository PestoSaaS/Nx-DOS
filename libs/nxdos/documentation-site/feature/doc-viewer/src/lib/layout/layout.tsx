import { CSSProperties, PropsWithChildren, useEffect } from 'react';
import {
  InstantSearchWrapper,
  SearchResults,
} from '@nxdos/documentation-site/feature/algolia-search';
import { Sidebar } from '../sidebar/sidebar';
import { Menu } from '@nxdos/documentation-site/models/menu';
import styles from './layout.module.css';
import { Header, PanelState } from '@nxdos/documentation-site/ui/common';
import { LayoutPanelOverlay } from './layout-panel-overlay';
import { LayoutPanelWrapper } from './layout-panel-wrapper';

export interface LayoutProps {
  menu: Menu;
  panelStates: {
    sidebarState: PanelState;
    searchPanelState: PanelState;
    overviewPanelState: PanelState;
  };
}

export function AppLayout(props: PropsWithChildren<LayoutProps>): JSX.Element {
  const mobileViewBreakpoint = 640; // 640 for 'sm', 768 for 'md'
  let lastReading = 0;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    lastReading = window.innerWidth;
    function updateWindowWidth() {
      if (
        window.innerWidth < mobileViewBreakpoint &&
        lastReading > mobileViewBreakpoint
      ) {
        props.panelStates.sidebarState.queueNextState(false);
      }
      if (
        window.innerWidth >= mobileViewBreakpoint &&
        lastReading < mobileViewBreakpoint
      ) {
        props.panelStates.sidebarState.queueNextState(true);
      }

      lastReading = window.innerWidth;
    }
    window.addEventListener('resize', updateWindowWidth);
    updateWindowWidth();

    return () => window.removeEventListener('resize', updateWindowWidth);
  }, []);

  return (
    <div
      className="flex appWrapper max-sm:![--view-breakpoint-switch-sm:1]"
      style={
        {
          borderLeft:
            'calc(env(safe-area-inset-left) * 2.5 / 3) solid transparent',
          borderRight:
            'calc(env(safe-area-inset-right) * 2.5 / 3) solid transparent',
        } as CSSProperties
      }
    >
      <InstantSearchWrapper>
        <Sidebar menu={props.menu} panelStates={props.panelStates} />

        <div className="flex flex-col grow relative">
          <div className="absolute inset-0">
            <div className="flex relative h-[100%] max-w-[100%]">
              <div className="flex grow flex-col-reverse lg:flex-row relative lg:items-start h-[100%] max-w-[100%]">
                <div
                  className={
                    'flex grow h-[100%] overflow-y-scroll flex-col ' +
                    styles['scrollFrame']
                  }
                  id="scrollFrame"
                >
                  <Header panelStates={props.panelStates} />
                  <LayoutPanelWrapper panelStates={props.panelStates}>
                    <SearchResults panelStates={props.panelStates} />
                  </LayoutPanelWrapper>

                  <LayoutPanelOverlay panelStates={props.panelStates} />
                  {props.children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </InstantSearchWrapper>
    </div>
  );
}
