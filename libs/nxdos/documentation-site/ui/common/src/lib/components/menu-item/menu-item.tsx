import { MenuItem } from '@nxdos/documentation-site/models/menu';
import Link from 'next/link';
import styles from './menu-item.module.css';
import { CSSProperties, Dispatch, SetStateAction, useState } from 'react';
import { useRouter } from 'next/router';

export interface NavMenuItemProps {
  item: MenuItem;
  level?: number;
  setSidebarState: Dispatch<SetStateAction<boolean>>;
  setOverviewPanelState: Dispatch<SetStateAction<boolean>>;
  toggleSearchPanel: Dispatch<SetStateAction<boolean>>;
  isSearchPanelOpen: boolean;
}

const withoutAnchors = (linkText: string): string => {
  return linkText?.includes('#')
    ? linkText.substring(0, linkText.indexOf('#'))
    : linkText;
};

export function NavMenuItem({
  item,
  level = 0,
  setSidebarState,
  setOverviewPanelState,
  toggleSearchPanel,
  isSearchPanelOpen,
}: NavMenuItemProps): JSX.Element {
  const [isOpen, toggleOpen] = useState(true);
  const router = useRouter();
  const targetPath = item.overrideURL ? item.overrideURL : item.path;
  const isActiveLink =
    encodeURI('/' + targetPath) === withoutAnchors(router?.asPath);

  const closePanelsOnNavigation = (breakpointSwitch: number) => {
    if (breakpointSwitch === 1) {
      if (isSearchPanelOpen) {
        toggleSearchPanel(false);
        setOverviewPanelState(false);
        setTimeout(() => {
          setSidebarState(false);
        }, 300);
      } else {
        setSidebarState(false);
      }
    } else {
      setOverviewPanelState(false);
      toggleSearchPanel(false);
    }
    router.events.off('routeChangeStart', closePanelsOnNavigation);
  };

  const navItemClickHandler = () => {
    const appWrapper = document.getElementsByClassName('appWrapper')[0];
    const breakpointSwitch = getComputedStyle(appWrapper).getPropertyValue(
      '--view-breakpoint-switch-sm'
    );
    router.events.on('routeChangeStart', () =>
      closePanelsOnNavigation(breakpointSwitch ? Number(breakpointSwitch) : 0)
    );
  };

  return (
    <div
      data-testid={'nav-' + targetPath}
      key={targetPath}
      className={
        styles['navMenuItem'] +
        ' ' +
        (!(typeof item.itemList !== 'undefined') &&
          styles['leafNodeMenuItem']) +
        (item.path === 'devlogs' ? ' ' + styles['devlogsMenuItem'] : '') +
        (isActiveLink ? ' ' + styles['activeLinkMenuItem'] : '')
      }
      style={{ '--menu-item-offset': level } as CSSProperties}
    >
      {typeof item.itemList !== 'undefined' ? (
        <div
          className={
            styles['folder'] +
            ' ' +
            styles[isOpen ? 'folder--open' : 'folder--closed']
          }
          onClick={() => toggleOpen(!isOpen)}
        >
          <span className={styles['folderPathIndicatorAlt']}>
            <span className={styles['folderPathIndicator--firstLetter']}>
              &nbsp;
            </span>
            <span className={styles['folderPathIndicator--secondLetter']}>
              {'\u2500'}
            </span>
          </span>

          <span className={styles['folderPathIndicator']}>
            <span className={styles['folderPathIndicator--firstLetter']}>
              &nbsp;
            </span>
            <span className={styles['folderPathIndicator--secondLetter']}>
              {'\u2500'}
            </span>
          </span>

          <span className={styles['folderPathSpacer']}>{'\u2502'}</span>
          <span
            className={
              styles['navMenuFolderBullet'] +
              (isOpen ? ' ' + styles['navMenuFolderBullet--open'] : '')
            }
          >
            {'\u25BC'}
          </span>
          <span className={styles['navMenuFolderLabel']}>
            <div className={styles['navItemFrameAreaExtension']} />
            <span className={styles['navMenuFolder-hoverMarker']}> </span>
            <span className={styles['menuItemLabelText']}>{item.name}</span>
          </span>
        </div>
      ) : (
        <Link
          href={targetPath}
          onClick={navItemClickHandler}
          data-testid={'nav-clickHandler-' + targetPath}
        >
          <>
            <span className={styles['folderPathIndicator']}>
              <span className={styles['folderPathIndicator--firstLetter']}>
                &nbsp;
                <span className={styles['folderPathIndicator--hoverLayer']}>
                  {'\u2514'}
                </span>
              </span>
              <span
                className={
                  styles['folderPathIndicator--secondLetter'] +
                  ' ' +
                  styles['itemPathIndicator']
                }
              >
                {'\u2500'}
              </span>
            </span>
            <span className={styles['folderPathSpacer']}>{'\u2502'}</span>
            <span className={styles['navMenuItemBullet']}>{'\u2219'}</span>
            <span className={styles['navMenuItemLabel']}>
              <div className={styles['navItemFrameAreaExtension']} />
              <span className={styles['navMenuItem-hoverMarker']}>[</span>
              <span className={styles['menuItemLabelText']}>{item.name}</span>
              <span className={styles['navMenuItem-hoverMarker']}>]</span>
            </span>
          </>
        </Link>
      )}

      <div className={styles['connectorFrame']}>{'│'.repeat(100)}</div>
      <div className={styles['connectorMask']}>{'│'.repeat(100)}</div>

      <div className={isOpen ? styles['open'] : styles['closed']}>
        {item.itemList &&
          item.itemList.map((child, index) => {
            return (
              <div key={child.path} className={styles['navItemFrame']}>
                {typeof item.itemList !== 'undefined' &&
                  index === item.itemList.length - 1 && (
                    <div className={styles['connectorEndPiece']}>
                      {'\u2514'}─
                    </div>
                  )}
                <NavMenuItem
                  item={child}
                  level={level + 1}
                  setSidebarState={setSidebarState}
                  setOverviewPanelState={setOverviewPanelState}
                  toggleSearchPanel={toggleSearchPanel}
                  isSearchPanelOpen={isSearchPanelOpen}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}
