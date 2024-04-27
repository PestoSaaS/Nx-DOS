import styles from './embedded-code.module.css';
import { transformEmbeddedCodeFilePath } from '../../utils/generate-section-id';

export function EmbeddedCode(props: {
  filePath: string;
  language?: string;
  componentType: 'EmbeddedCode';
}): JSX.Element {
  const transformedFilePath = transformEmbeddedCodeFilePath(
    props.filePath
  ).replaceAll('/', '/<wbr>');
  return (
    <div className={styles['embedded-code-directory-wrapper']}>
      <div className={styles['embedded-code-directory--shadow-top']}></div>
      <div className={styles['embedded-code-directory']}>
        <div
          className={styles['embedded-code-directory-label']}
          dangerouslySetInnerHTML={{ __html: transformedFilePath }}
        />
      </div>
    </div>
  );
}
