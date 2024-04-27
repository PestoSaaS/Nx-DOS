import { TocItemMeta } from '@nxdos/documentation-site/models/document';
import { TableOfContents } from './table-of-contents';
import styles from './overview-panel.module.css';

export interface OverviewPanelProps {
  tocList: TocItemMeta[];
  closePanelActionHandler?: () => void;
}

export function OverviewPanel(props: OverviewPanelProps): JSX.Element {
  return (
    <div
      className={styles['overviewPanelContainer'] + ' overviewPanelContainer'}
      id={'overviewPanelContainer'}
    >
      <TableOfContents
        tocList={props.tocList}
        closePanelActionHandler={props.closePanelActionHandler}
      />
    </div>
  );
}
