import React, { useCallback, useMemo } from 'react';
import styles from './article.module.css';

export interface ContentSectionProps {
  sectionID: string;
  section: React.ReactNode;
}

export function ContentSection(props: ContentSectionProps): JSX.Element {
  const renderContentSection = useCallback(
    (section: React.ReactNode) => {
      if (
        section &&
        section[0 as keyof typeof section]['props']['componentType'] ===
          'Heading'
      ) {
        const modifiedSection = section;
        modifiedSection[0 as keyof typeof section] = (
          <div
            key={section[0 as keyof typeof section]}
            className={styles['headingObserverWrapper']}
            data-anchorlink={props.sectionID}
          >
            {section[0 as keyof typeof section]}
          </div>
        ) as never;

        const anchoredSections = [];
        for (let m = 0; m < (modifiedSection as JSX.Element[]).length; m++) {
          anchoredSections.push(
            <span key={m}>
              {/* eslint-disable-next-line 
              jsx-a11y/anchor-is-valid, 
              jsx-a11y/anchor-has-content 
            */}
              <a
                className={styles['searchAnchor']}
                id={props.sectionID + '?s=' + String(m + 1)}
                aria-hidden
              ></a>
              {(modifiedSection as JSX.Element[])[m]}
            </span>
          );
        }
        return anchoredSections;
      } else {
        return section;
      }
    },
    [props.sectionID]
  );

  const contentSection = useMemo(
    () => renderContentSection(props.section),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.section]
  );

  return (
    <section key={props.sectionID} className={styles['sectionWrapper']}>
      {contentSection}
      <div id={props.sectionID} className={styles['anchorLink']} />
    </section>
  );
}
