import { PropsWithChildren } from 'react';
import styles from './reader-mode-workarounds.module.css';

export interface ReaderModeWorkaroundProps__ArticleMeta {
  article_title: string;
  article_date: string;
}

export const READER_MODE_WORKAROUND__ARTICLE_META__CHROME = (
  props: ReaderModeWorkaroundProps__ArticleMeta
): JSX.Element => {
  /* elements below are not visible for display 
       DO NOT MOVE: position in HTML hierarchy matters 
       DO NOT MODIFY: class and tag names effect parsers */
  return (
    <>
      <h1
        className={
          'article_title ' + styles['readerModeWorkaround--articleTitle']
        }
      >
        {props.article_title}
      </h1>
      <p className={styles['readerModeWorkaround--articleDate']}>
        last updated at&nbsp;
        <time>{props.article_date}</time>
      </p>
    </>
  );
};

export const READER_MODE_WORKAROUND__ARTICLE_META__SAFARI = (
  props: ReaderModeWorkaroundProps__ArticleMeta
): JSX.Element => {
  /* elements below are not visible for display 
       DO NOT MOVE: position in HTML hierarchy matters 
       DO NOT MODIFY: class and tag names effect parsers */
  return (
    /* eslint-disable-next-line jsx-a11y/no-redundant-roles */
    <h1
      className={styles['readerModeWorkaround--articleTitle']}
      aria-hidden
      role="heading"
      id={props.article_title.replace(' ', '-').toLowerCase()}
    >
      {props.article_title}
    </h1>
  );
};

// interface HTMLElementWithChildren extends HTMLElement {
//   children: HTMLCollection
// }

export interface ReaderModeWorkaroundProps__Headings {
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  Component: React.ElementType<any>;
}

export const READER_MODE_WORKAROUND__HEADINGS__SAFARI = (
  props: PropsWithChildren<ReaderModeWorkaroundProps__Headings>
): JSX.Element => {
  /* elements below are not visible for display 
       DO NOT MOVE: position in HTML hierarchy matters 
       DO NOT MODIFY: class and tag names effect parsers */
  return (
    <props.Component
      className={styles['readerModeWorkaround--headingLabel']}
      aria-hidden="false"
      role="heading"
    >
      {/* Safari strips subheadings from reader mode when their text content 
       is slightly similar to the article title. This leads to false positives
       when there are even few words similar and the rest of the title is 
       different. The replica node below modifies the text content of the
       heading with zero-width joiners in between each character to fool
       Safari's analysis and forces it to be included in the reader mode. */}
      {(props.children as string).replace(/(.{1})/g, '$1\u200B\u200C')}
    </props.Component>
  );
};

export const READER_MODE_WORKAROUND__MINCONTENT__SAFARI = () => (
  /* workaround to ensure Safari reader mode activation:
     injecting zerowidth spacers to achieve minimum number
     of characters required, especially for short articles. */
  <p className={styles['readerModeWorkaround--Safari-MinContent']}>
    {'\u200B\u200C'.repeat(200)}
  </p>
);
