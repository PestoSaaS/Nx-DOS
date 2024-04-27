import styles from './article.module.css';

export interface EmbeddedCodeBlockProps {
  codeBlockID: string;
  fileHeader: React.ReactNode;
  codeFence?: React.ReactNode;
}

export function EmbeddedCodeBlock(props: EmbeddedCodeBlockProps): JSX.Element {
  return (
    <div
      className={
        styles['embeddedCodeBlockWrapper'] +
        ' will-change-transform transform-gpu'
      }
    >
      {props.fileHeader}
      {typeof props.codeFence !== 'undefined' ? props.codeFence : ''}
      <div key="endPiece" className={styles['embeddedCodeBlockEndPiece']} />
      <div
        className={styles['embeddedCodeBlockAnchor']}
        id={props.codeBlockID}
        key="codeBlockAnchor"
      />
    </div>
  );
}
