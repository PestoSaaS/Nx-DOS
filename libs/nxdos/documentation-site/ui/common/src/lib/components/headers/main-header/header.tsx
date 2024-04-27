import { useRouter } from 'next/router';
import styles from './header.module.css';
import { useInstantSearch } from 'react-instantsearch';
import { PanelState } from '../../../..';

export interface HeaderProps {
  panelStates: {
    sidebarState: PanelState;
    searchPanelState: PanelState;
    overviewPanelState: PanelState;
  };
}

function withoutAnchors(linkText: string): string {
  return linkText?.includes('#')
    ? linkText.substring(0, linkText.indexOf('#'))
    : linkText;
}

export function Header(props: HeaderProps): JSX.Element {
  const { indexUiState } = useInstantSearch();
  const router = useRouter();
  const breadcrumbs = withoutAnchors(router.asPath)
    .split('/')
    .slice(1)
    .reverse()
    .map((section) => {
      return (
        <div className={styles['breadcrumb']} key={section}>
          <span className={styles['breadcrumbLabel']}>{section}</span>
        </div>
      );
    });

  const headerClickHandler = () => {
    const appWrapper = document.getElementsByClassName('appWrapper')[0];
    const breakpointSwitch = getComputedStyle(appWrapper).getPropertyValue(
      '--view-breakpoint-switch-sm'
    );
    if (Number(breakpointSwitch) === 0) {
      toggleSidebar();
    } else if (Number(breakpointSwitch) === 1) {
      toggleSidebar_alternateForSmallBreakpoint();
    }
  };

  const toggleSidebar = () => {
    props.panelStates.sidebarState.queueNextState(
      !props.panelStates.sidebarState.isOpen
    );
  };

  const toggleSidebar_alternateForSmallBreakpoint = () => {
    if (props.panelStates.overviewPanelState.isOpen) {
      if (typeof props.panelStates.overviewPanelState !== 'undefined') {
        props.panelStates.overviewPanelState.queueNextState(false);
      }
      setTimeout(() => {
        toggleSidebar();
      }, 250);
    } else {
      toggleSidebar();
    }
  };

  return (
    <>
      <div className={styles['headerContainer--blurLayer']}>
        <HeaderBgBlur />
      </div>
      <div
        className={
          styles['headerContainer'] +
          (props.panelStates.sidebarState.isOpen
            ? ' max-sm:[pointer-events:none]'
            : '')
        }
      >
        <HeaderBg />

        <div
          className={
            styles['breadcrumbsContainer'] +
            ' max-w-[calc(100%-var(--header-breadcrumbs-right-margin))] ' +
            ' lg:max-w-[var(--max-width-after-bp-large)] ' +
            (indexUiState.query ? ' opacity-[0] [pointer-events:none] ' : '') +
            (props.panelStates.sidebarState.isOpen
              ? ' max-sm:opacity-[0] max-sm:[pointer-events:none] '
              : '')
          }
          data-testid={'headerClickHandler'}
          onClick={headerClickHandler}
        >
          <div className={styles['breadcrumbsList--overflowSign']}>
            {'>'}&nbsp;
          </div>
          <div className={styles['breadcrumbsListWrapper']}>
            <div className={styles['breadcrumbsList']}>
              {breadcrumbs}
              <div className={styles['breadcrumbSeparator']} />
              <div
                className={
                  styles['breadcrumb'] + ' ' + styles['breadcrumb--root']
                }
              >
                &nbsp;
                <span className={styles['breadcrumbLabel']}>
                  <span className={styles['breadcrumbLabelTilda']}>
                    <span className={styles['breadcrumbLabelMask']} />
                    &nbsp;~
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const HeaderBg = () => {
  return (
    <div className={styles['headerBg']}>
      <div className={styles['headerBg-gradientLayer']} />
    </div>
  );
};

const HeaderBgBlur = () => {
  return (
    <div className={styles['headerBg']}>
      <div className={styles['headerBg-blurLayer']}>
        <div className={styles['headerBg-blurLayer']}>
          <div className={styles['headerBg-blurLayer']}>
            <div className={styles['headerBg-blurLayer']}>
              <div className={styles['headerBg-blurLayer']}>
                <div className={styles['headerBg-blurLayer']}>
                  <div className={styles['headerBg-blurLayer']}>
                    <div className={styles['headerBg-blurLayer']}>
                      <div className={styles['headerBg-blurLayer']}>
                        <div className={styles['headerBg-blurLayer']}>
                          <div className={styles['headerBg-blurLayer']}>
                            <div className={styles['headerBg-blurLayer']}>
                              <div className={styles['headerBg-blurLayer']}>
                                <div className={styles['headerBg-blurLayer']}>
                                  <div
                                    className={styles['headerBg-blurLayer']}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
