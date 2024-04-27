import styles from './sidebar-header.module.css';
import { useEffect } from 'react';
import Link from 'next/link';
import {
  Logo,
  GithubIcon,
  PanelState,
  useThemeContext,
  updateSiteIcons,
} from '../../../..';
import { useInstantSearch } from 'react-instantsearch';

export interface SidebarHeaderProps {
  panelStates: {
    sidebarState: PanelState;
    searchPanelState: PanelState;
    overviewPanelState: PanelState;
  };
}

export function SidebarHeader({
  panelStates,
}: SidebarHeaderProps): JSX.Element {
  const { indexUiState } = useInstantSearch();
  const themeState = useThemeContext();
  const logoLowerSectionClickHandler = () => {
    themeState.changeTheme();
  };

  useEffect(() => {
    updateSiteIcons(themeState.selectedThemes.defaultTheme);
  }, [themeState.selectedThemes]);

  return (
    <div className={styles['sidebarHeader']}>
      <Logo className={styles['logo']} />
      <span
        className={styles['menuLogoButton']}
        data-testid={'sidebarHeaderClickHandler--toggle'}
        onClick={() => {
          panelStates.sidebarState.queueNextState(
            !panelStates.sidebarState.isOpen
          );
        }}
      >
        <span className={styles['menuLogoCaption']}>Nx starter guide</span>

        {panelStates.sidebarState.isOpen && !indexUiState.query && (
          <div className={styles['sidebar--closeIconClone']}>
            <div
              className={
                styles['sidebar--closeIconClone--arrow'] + ' sm:hidden'
              }
            >
              {'\u25BC'}
            </div>
            <div className={'max-sm:hidden'}>{'~'}</div>
          </div>
        )}
      </span>

      <Link href={'/'} className={styles['sidebarHeaderButton']}>
        {'\u2554'}
        {'\u2550'.repeat(8)}
        {'\u2557'}
        <br />
        {'\u2551'}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {'\u2551'}
        <br />
        <span className={styles['versionNumberCaption']}>0.0.1</span>
        {'\u255A'}
        {'\u2550'.repeat(8)}
        {'\u255D'}
        <br />
      </Link>
      <a
        className={styles['sidebarHeaderButton']}
        target="_blank"
        href="https://github.com/PestoSaaS/Nx-DOS"
        rel="noopener noreferrer"
      >
        {'\u2554'}
        {'\u2550'.repeat(3)}
        {'\u2557'}
        <br />
        {'\u2551'}&nbsp;
        <div className={styles['sidebarHeaderButtonIconFrame']}>
          <div className={styles['sidebarHeaderButtonIconInnerFrame']}>
            <div className={styles['sidebarHeaderButtonIcon']}>
              <GithubIcon />
            </div>
          </div>
        </div>
        &nbsp;{'\u2551'}
        <br />
        {'\u255A'}
        {'\u2550'.repeat(3)}
        {'\u255D'}
        <br />
      </a>
      <br />

      <div
        className={styles['logoLowerSideClickZone']}
        onClick={logoLowerSectionClickHandler}
        data-testid={'sidebarHeaderClickHandler--changeTheme'}
      >
        <div className={styles['logoLowerSideFrame']}>
          <Logo className={styles['logo--masked']} />
          <Logo
            className={
              styles['logo--masked'] + ' ' + styles['logo--masked--hoverLayer']
            }
          />
          <div className={styles['logoMaskWrapper']}>
            <div className={styles['logoMaskOverlayPatch']} />
            <div
              className={styles['logoMaskOverlayPatch--renderGlitchPatch1']}
            />
            <div
              className={styles['logoMaskOverlayPatch--renderGlitchPatch2']}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
