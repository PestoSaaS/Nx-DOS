import { PanelState } from '@nxdos/documentation-site/ui/common';
import styles from './layout.module.css';

export interface LayoutPanelOverlayProps {
  panelStates: {
    sidebarState: PanelState;
    searchPanelState: PanelState;
    overviewPanelState: PanelState;
  };
}

export function LayoutPanelOverlay(
  props: LayoutPanelOverlayProps
): JSX.Element {
  const closeOverlay = () => {
    if (
      typeof props.panelStates.searchPanelState.queueNextState !== 'undefined'
    ) {
      props.panelStates.searchPanelState.queueNextState(false);
    }
  };

  const closeOverlay_alternateForSmallBreakpoint = () => {
    closeOverlay();
    if (props.panelStates.sidebarState.isOpen) {
      props.panelStates.sidebarState.queueNextState(false);
    }
  };

  return (
    <div
      className={
        styles['panelOverlayAnchor'] +
        ' sm:block ' +
        (props.panelStates.sidebarState.isOpen
          ? ' max-sm:[--overlay-pointer-events:all] max-sm:[--content-section-overlay--force-toggled:1] sm:[--content-section-overlay--force-toggled:0] sm:[--overlay-pointer-events:none] '
          : ' max-sm:[--overlay-pointer-events:none]') +
        (props.panelStates.searchPanelState.isOpen
          ? ' ' + styles['panelOverlay--toggled']
          : '')
      }
    >
      <div
        className={
          styles['panelOverlayWrapper'] +
          (!props.panelStates.searchPanelState.isOpen
            ? ' ![opacity:0] ![cursor:auto] '
            : ' ') +
          (props.panelStates.sidebarState.isOpen
            ? ' max-sm:![opacity:1] ![cursor:pointer]'
            : ' ') +
          (!props.panelStates.sidebarState.isOpen &&
          !props.panelStates.searchPanelState.isOpen &&
          !props.panelStates.overviewPanelState.isOpen
            ? ' [pointer-events:none]'
            : ' ')
        }
      >
        <div className={styles['panelOverlayBg']} />
        <div className={styles['panelOverlayBgTopMask']} />
        <div className={styles['panelOverlayCheckersPattern']} />
        <div
          className={styles['panelOverlayClickHandler']}
          onClick={closeOverlay}
          data-testid="panelOverlayClickHandler"
        />
        <div
          className={
            styles['panelOverlayClickHandler'] + ' sm:[pointer-events:none]'
          }
          onClick={closeOverlay_alternateForSmallBreakpoint}
          data-testid="panelOverlayClickHandler_alt"
        />
      </div>
    </div>
  );
}
