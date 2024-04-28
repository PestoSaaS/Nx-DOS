import { PropsWithChildren } from 'react';
import styles from './layout.module.css';
import { PanelState } from '@nxdos/documentation-site/ui/common';
import { useInstantSearch } from 'react-instantsearch';

export interface LayoutPanelWrapperProps {
  panelStates: {
    sidebarState: PanelState;
    searchPanelState: PanelState;
    overviewPanelState: PanelState;
  };
}

export function LayoutPanelWrapper(
  props: PropsWithChildren<LayoutPanelWrapperProps>
): JSX.Element {
  const { indexUiState } = useInstantSearch();
  return (
    <div
      className={
        styles['panelWrapper'] +
        ' max-w-[var(--max-width-till-bp-large)] sm:max-w-[100%] ' +
        ' lg:max-w-[var(--max-width-after-bp-large)] sm:!translate-x-[0] ' +
        (props.panelStates.sidebarState.isOpen
          ? ' ' + styles['panelWrapperSqueezedBySidebar']
          : '')
      }
    >
      <div
        className={
          styles['panelAnchor'] +
          ' ' +
          (props.panelStates.searchPanelState.isOpen
            ? styles['panelAnchor--active']
            : '') +
          ' sm:!translate-x-[0] sm:!w-[100%] sm:!max-w-[100%]  '
        }
      >
        {props.children}

        <div
          className={
            styles['panelOverlay--header--viewBreakpoint--max-sm'] +
            ' [opacity:0] [pointer-events:none] ' +
            (props.panelStates.sidebarState.isOpen && !indexUiState.query
              ? ' max-sm:[opacity:1] max-sm:[pointer-events:all] '
              : styles['withSearchQuery'])
          }
        >
          <span className={styles['panelOverlay--header--returnIcon']}>
            {'\u25BC'}
          </span>
          close
        </div>

        <div
          className={
            styles['panelAnchor--glitchMask'] +
            ' hidden max-sm:[display:unset] ' +
            (props.panelStates.sidebarState.isOpen ||
            props.panelStates.searchPanelState.isOpen
              ? '[opacity:1]'
              : '[opacity:0]')
          }
        />
      </div>
    </div>
  );
}
