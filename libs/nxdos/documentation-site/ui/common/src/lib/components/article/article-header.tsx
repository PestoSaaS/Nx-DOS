import { DocumentData } from '@nxdos/documentation-site/models/document';
import { Dispatch, SetStateAction } from 'react';
import styles from './article.module.css';

export interface ArticleHeaderProps {
  documentFrontMatterData: DocumentData['frontMatterData'];
  heightReporter?: Dispatch<SetStateAction<number>>;
  displayDate: string;
}

export function ArticleHeader(props: ArticleHeaderProps): JSX.Element {
  return (
    <div className={styles['articleHeader']}>
      <div className={styles['articleHeaderBg']} />
      <div className={styles['articleTitleFrame']}>
        <div className={styles['articleTitleLabelFrame']} aria-hidden>
          <h1 className={'articleTitleLabel ' + styles['articleTitleLabel']}>
            {props.documentFrontMatterData['title']}
          </h1>
        </div>
      </div>

      <div className={styles['articleMetaInformation']}>
        {props.displayDate.length > 0 && (
          <div className={styles['articleUpdatedAtFrame']}>
            <span className={'dateline '}>
              last updated on&nbsp;
              <span className={styles['articleUpdatedAtLabel']}>
                {props.displayDate}
              </span>
            </span>
            {props.documentFrontMatterData['author']['name'] && (
              <span>{props.displayDate.length > 0 && ',\u00A0'}</span>
            )}
          </div>
        )}
        {/* ## READER MODE workaround ##
        opted to use the object tag as a workaround to hide unwanted
        elements from reader mode, as aria-hidden doesn't work on Safari */}
        {props.documentFrontMatterData['author']['name'] && (
          <div className={styles['articleAuthorFrame']} aria-hidden>
            <span className={'author byline '}>
              <object>by&nbsp;</object>
              <object className={styles['articleAuthorLabel']}>
                {props.documentFrontMatterData['author']['name']}
              </object>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
