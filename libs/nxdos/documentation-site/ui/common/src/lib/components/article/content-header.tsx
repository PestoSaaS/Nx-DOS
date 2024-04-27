import { MenuItem } from '@nxdos/documentation-site/models/menu';
import Link from 'next/link';
import styles from './article.module.css';

export interface ArticleNavigationProps {
  currentPath: string;
  previousArticle: MenuItem | null;
  nextArticle: MenuItem | null;
}

export function ContentHeader(props: ArticleNavigationProps): JSX.Element {
  return props.previousArticle ? (
    <div className={styles['contentHeader'] + ' ' + styles['commentBlock']}>
      <div className={styles['commentLine']} />

      {props.previousArticle && (
        <div className={styles['commentLine']}>
          prev section
          <span className={styles['commentLine--separator']}>:</span>{' '}
          <Link
            href={
              props.previousArticle?.overrideURL
                ? props.previousArticle?.overrideURL
                : props.previousArticle?.path
            }
          >
            {props.previousArticle?.name}
          </Link>
        </div>
      )}

      {props.nextArticle && (
        <div className={styles['commentLine']}>
          next section
          <span className={styles['commentLine--separator']}>:</span>{' '}
          <Link
            href={
              props.nextArticle?.overrideURL
                ? props.nextArticle?.overrideURL
                : props.nextArticle?.path
            }
          >
            {props.nextArticle?.name}
          </Link>
        </div>
      )}

      <div className={styles['commentLine']} />
    </div>
  ) : (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <></>
  );
}

export const readerMode__navigation = (props: ArticleNavigationProps) => {
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : '';

  const URL = `${origin}${props.currentPath.split('#')[0]}`;
  return (
    `<span>
      <i>/ * *</i>
      <br/>
      <span className="copyright"><i>*</i>&nbsp;&nbsp;Nx-DOS, 
      <span className="copyrightIcon">\u00A9</span><span>2024</span>
      <br/>
      <span className="version"><i>*</i>&nbsp;&nbsp;version 0.0.1</span> 
      </span>
      <br/>
      <span className="currentPath"><i>*</i>&nbsp;&nbsp;<a href="` +
    URL +
    `">` +
    URL.split('://')[1] +
    `</a></span>
      <span id="readerMode__navigation_links">
      <br/>
      <i>*</i>` +
    (props.previousArticle
      ? `<br/><span><i>*</i>&nbsp;&nbsp;prev section: <a className="previousArticle"
            href="/` +
        (props.previousArticle?.overrideURL
          ? props.previousArticle?.overrideURL
          : props.previousArticle?.path) +
        `">` +
        props.previousArticle?.name +
        `</a></span>`
      : '') +
    (props.nextArticle
      ? `<br/><span><i>*</i>&nbsp;&nbsp;next section: <a className="nextArticle"
            href="/` +
        (props.nextArticle?.overrideURL
          ? props.nextArticle?.overrideURL
          : props.nextArticle?.path) +
        `">` +
        props.nextArticle?.name +
        `</a></span>`
      : '') +
    `</span><br/><i>* * /</i></span>`
  );
};

export const contentHeader__readerMode = (props: ArticleNavigationProps) => {
  return (
    `<style>
      @media print {
      #contentHeader__readerMode{
        height: unset !important;
        width: unset !important;
        position: relative !important;
        overflow: unset !important;
        left: 1ch
      }
      #readerMode__navigation_links{
        display: none !important;
      }
    }</style>
     <span id="contentHeader__readerMode"
      style="
      height: 0;
      width: 0;
      position: absolute;
      overflow: hidden;
      outline: none;
      -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
      -moz-user-select: none; /* Old versions of Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
      user-select: none;
      pointer-events: none;
    ">` +
    readerMode__navigation(props) +
    `</span>`
  );
};
