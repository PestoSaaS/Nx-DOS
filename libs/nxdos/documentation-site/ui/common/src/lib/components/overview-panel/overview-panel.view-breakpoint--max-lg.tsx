import { TocItemMeta } from '@nxdos/documentation-site/models/document';
import styles from './overview-panel.module.css';
import { OverviewPanel } from './overview-panel.base';
import { PanelState } from '../../..';
import { useEffect, useState } from 'react';

import { ReactComponent as TocIcon } from '../../../assets/icons/toc-icon.svg';
import { ReactComponent as CloseIcon } from '../../../assets/icons/close-icon.svg';

export interface OVERVIEW_PANEL_PROPS__VIEW_BREAKPOINT_MAX_LG_PROPS {
  tocList: TocItemMeta[];
  panelStates: {
    sidebarState: PanelState;
    searchPanelState: PanelState;
    overviewPanelState: PanelState;
  };
}

export function OVERVIEW_PANEL_PROPS__VIEW_BREAKPOINT_MAX_LG(
  props: OVERVIEW_PANEL_PROPS__VIEW_BREAKPOINT_MAX_LG_PROPS
): JSX.Element {
  const [isTocButtonVisible, toggleTocButtonVisibility] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  let scrollFrame: HTMLElement | null;

  const handleScroll = () => {
    if (!scrollFrame) {
      scrollFrame = document.getElementById('scrollFrame');
    }

    const clientHeight = document.documentElement.clientHeight;

    const position = !scrollFrame ? 0 : scrollFrame.scrollTop;
    const scrollPercentage = Math.round(
      ((position + clientHeight) /
        (!scrollFrame ? clientHeight : scrollFrame['scrollHeight'])) *
        100
    );

    setScrollPosition(Math.min(scrollPercentage, 100));
  };

  const toggleOverviewPanel = () =>
    props.panelStates.overviewPanelState.queueNextState(
      !props.panelStates.overviewPanelState.isOpen
    );

  const toggleOverviewPanel_alternateForSmallBreakpoint = () => {
    if (
      typeof props.panelStates.searchPanelState.queueNextState !==
        'undefined' &&
      props.panelStates.searchPanelState.isOpen
    ) {
      props.panelStates.searchPanelState.queueNextState(false);
      if (props.panelStates.sidebarState.isOpen) {
        props.panelStates.sidebarState.queueNextState(false);
        setTimeout(() => {
          toggleOverviewPanel();
        }, 250);
      } else {
        toggleOverviewPanel();
      }
    } else {
      if (props.panelStates.sidebarState.isOpen) {
        props.panelStates.sidebarState.queueNextState(false);
        setTimeout(() => {
          toggleOverviewPanel();
        }, 250);
      } else {
        toggleOverviewPanel();
      }
    }
  };

  useEffect(() => {
    let tocObserver: IntersectionObserver | null = null;
    if (typeof window !== 'undefined') {
      tocObserver = new window.IntersectionObserver(
        /* istanbul ignore next */
        ([entry]) => {
          if (entry.isIntersecting) {
            // ENTRY
            toggleTocButtonVisibility(false);
            props.panelStates.overviewPanelState.queueNextState(false);
            return;
          }
          //EXIT
          toggleTocButtonVisibility(true);
        },
        {
          root: null,
          threshold: 0.99,
          // treshold 0.1 means trigger if at least 10% of element in viewport
        }
      );
    }
    const el = document.querySelector('#overviewPanelAnchor');
    if (tocObserver !== null && typeof el !== 'undefined' && el !== null) {
      tocObserver?.observe(el);
    }
  }, [props]);

  useEffect(() => {
    document
      .getElementById('scrollFrame')
      ?.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      document
        .getElementById('scrollFrame')
        ?.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  return (
    <>
      <div
        className={
          styles['slidingOverviewPanelWrapper'] +
          ' ' +
          (props.panelStates.overviewPanelState.isOpen
            ? ' ' + styles['includesOpenPanel']
            : '') +
          ' lg:hidden'
        }
      >
        <div
          className={styles['overviewPanelOverlayBg'] + ' lg:hidden'}
          data-testid={'overviewPanelOverlayBg'}
          onClick={() =>
            props.panelStates.overviewPanelState.queueNextState(
              !props.panelStates.overviewPanelState.isOpen
            )
          }
        />
        <div
          className={styles['slidingOverviewPanel'] + ' slidingOverviewPanel'}
        >
          <OverviewPanel
            tocList={props.tocList}
            closePanelActionHandler={() =>
              props.panelStates.overviewPanelState.queueNextState(false)
            }
          />
        </div>
      </div>
      <div
        className={
          styles['overviewPanelToggleButton'] +
          ' ' +
          (isTocButtonVisible || props.panelStates.overviewPanelState.isOpen
            ? styles['overviewPanelToggleButtonVisible']
            : ' ') +
          ' ' +
          'lg:hidden'
        }
      >
        <div className={styles['overviewPanelToggleButtonWrapper']}>
          <div className={styles['progressIndicator']}>
            <span className={styles['progressIndicatorAmount']}>
              {scrollPosition}
              <span className={styles['progressPercentageSymbol']}>%</span>
            </span>

            <span className={styles['TocIcon']}>
              <TocIcon />
            </span>

            <div
              className={
                styles['overviewPanelToggleButton--clickHandler'] +
                ' [pointer-events:none] ' +
                (isTocButtonVisible ? ' max-sm:[pointer-events:all] ' : '')
              }
              data-testid={'toggleOverviewPanelButton_alternate'}
              onClick={toggleOverviewPanel_alternateForSmallBreakpoint}
            />
            <div
              className={
                styles['overviewPanelToggleButton--clickHandler'] +
                (isTocButtonVisible
                  ? ' [pointer-events:all]  '
                  : ' [pointer-events:none]  ') +
                ' max-sm:[pointer-events:none] '
              }
              data-testid={'toggleOverviewPanelButton'}
              onClick={toggleOverviewPanel}
            />
          </div>

          <div
            className={
              styles['panelCloseIconWrapper'] +
              ' ' +
              (props.panelStates.overviewPanelState.isOpen
                ? styles['panelCloseIconWrapper--visible']
                : '')
            }
          >
            <CloseIcon />
          </div>
        </div>
      </div>
    </>
  );
}
