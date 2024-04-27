import { Menu } from '@nxdos/documentation-site/models/menu';
import { SearchField } from '@nxdos/documentation-site/feature/algolia-search';

import {
  NavMenuItem,
  PanelState,
  SidebarHeader,
} from '@nxdos/documentation-site/ui/common';
import styles from './sidebar.module.css';

export interface SidebarProps {
  menu: Menu;
  panelStates: {
    sidebarState: PanelState;
    searchPanelState: PanelState;
    overviewPanelState: PanelState;
  };
}

export function Sidebar({ menu, panelStates }: SidebarProps): JSX.Element {
  return (
    <div
      className={
        styles['sidebarWrapper'] +
        ' fixed hidden sm:opacity-[1] w-full sm:w-auto sm:static ' +
        (panelStates.sidebarState.isOpen
          ? styles['sidebarWrapper--toggled']
          : '')
      }
    >
      <div
        className={
          styles['sidebarFrame'] +
          ' ' +
          ' max-sm:opacity-[1] !translate-x-[calc(-1*var(--sidebar-width))] max-sm:!w-[unset] sm:w-0  ' +
          (panelStates.sidebarState.isOpen
            ? ' sm:w-[var(--sidebar-width)] !translate-x-[-0px] '
            : ' ')
        }
      >
        <nav
          data-testid="sidebar"
          key="sidebar"
          className={styles['sidebar'] + ' sticky sm:absolute'}
        >
          <SidebarHeader panelStates={panelStates} />
          <SearchField panelStates={panelStates} />
          <div className={styles['sidebarContent']}>
            <div className={styles['menuItems']}>
              <br />
              {menu.sections.map((section) => {
                return (
                  <div key={section.path}>
                    <NavMenuItem
                      item={section}
                      key={section.path}
                      toggleSearchPanel={
                        panelStates.searchPanelState.queueNextState
                      }
                      setSidebarState={panelStates.sidebarState.queueNextState}
                      setOverviewPanelState={
                        panelStates.overviewPanelState.queueNextState
                      }
                      isSearchPanelOpen={panelStates.searchPanelState.isOpen}
                    />
                    <br />
                    <br />
                  </div>
                );
              })}
              <br />
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
