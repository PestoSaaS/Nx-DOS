import { MenuItem } from '@nxdos/documentation-site/models/menu';
import Link from 'next/link';
import {
  ArticleNavigationProps,
  readerMode__navigation,
} from './content-header';
import styles from './article.module.css';

export interface ContentFooterProps {
  previousArticle: MenuItem | null;
  nextArticle: MenuItem | null;
}

export function ContentFooter(props: ContentFooterProps): JSX.Element {
  return (
    <div className={styles['contentFooter'] + ' ' + styles['commentBlock']}>
      <div className={styles['commentLine']} />
      <div className={styles['commentLine']}>
        <span className={styles['copyrightIcon']}> {'\u00A9'}</span>
        2024
        <span className={styles['commentLine--punctuation']}>, </span>
        <Link href={'/'}>Nx-DOS</Link>
      </div>
      <div className={styles['commentLine']}>
        version 0<span className={styles['commentLine--punctuation']}>.</span>0
        <span className={styles['commentLine--punctuation']}>.</span>1
      </div>

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

      {(props.previousArticle || props.nextArticle) && (
        <div className={styles['commentLine']} />
      )}

      {!props.nextArticle && (
        <>
          <div className={styles['commentLine']}>
            You've reached the end of our docs
            <span className={styles['commentLine--separator']}>.</span>
          </div>
          <div className={styles['commentLine']}>
            Please don't forget to{' '}
            <Link href={'/acknowledgements#contributing'}>
              <span
                style={{
                  textDecoration: 'underline',
                  textDecorationStyle: 'dotted',
                }}
              >
                share feedback
              </span>
            </Link>
            <span className={styles['commentLine--separator']}>,</span>
          </div>
          <div className={styles['commentLine']}>
            and keep an eye out for&nbsp;
            <Link href={'/acknowledgements#special-thanks'}>
              <span
                style={{
                  textDecoration: 'underline',
                  textDecorationStyle: 'dotted',
                }}
              >
                our heroes
              </span>
            </Link>
            <span className={styles['commentLine--separator']}>.</span>
          </div>
        </>
      )}
      <div className={styles['commentLine']} />
      <div className={styles['commentLine']} />

      <span className={styles['endOfDocumentMarker']}>
        {'(' + (props.nextArticle ? 'END' : 'Thank you!') + ')'}
      </span>
    </div>
  );
}

export const contentFooter__readerMode = (props: ArticleNavigationProps) => {
  return (
    `<span style="
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
    `<p><i>(END)</i> _</p><br/></span>`
  );
};
