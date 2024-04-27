import { TocItemMeta } from '@nxdos/documentation-site/models/document';
import styles from './overview-panel.module.css';
import { OverviewPanel } from './overview-panel.base';

export interface OVERVIEW_PANEL_PROPS__VIEW_BREAKPOINT_LG__PROPS {
  tocList: TocItemMeta[];
  closePanelActionHandler?: () => void;
}

export function OVERVIEW_PANEL_PROPS__VIEW_BREAKPOINT_LG(
  props: OVERVIEW_PANEL_PROPS__VIEW_BREAKPOINT_LG__PROPS
): JSX.Element {
  return (
    <div
      className={
        styles['overviewPanelWrapper'] +
        ' hidden lg:block mx-[5ch] lg:mx-[0ch] max-w-[74.5ch] lg:flex-shrink-[100] ' +
        ' lg:min-w-[var(--overview-panel-min-width)] lg:max-w-[64ch] lg:sticky lg:z-[7]'
      }
    >
      <OverviewPanel
        tocList={props.tocList}
        closePanelActionHandler={props.closePanelActionHandler}
      />
    </div>
  );
}
