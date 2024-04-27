import { PropsWithChildren } from 'react';
import styles from './heading.module.css';
import { READER_MODE_WORKAROUND__HEADINGS__SAFARI } from '../../utils/reader-mode-workarounds';
import { generateIDfromString } from '../../utils/generate-section-id';

interface HeadingProps {
  id: string;
  level: number;
  className: string;
  componentType: 'Heading';
}

export function Heading({
  level,
  children,
  className,
}: PropsWithChildren<HeadingProps>) {
  const headingLevel = Math.min(level + 1, 6);
  const Component = `h${headingLevel}` as React.ElementType;

  return (
    <>
      {/* start of workaround for reader mode -- Safari 
       elements below are not visible for display 
       DO NOT MOVE: position in HTML hierarchy matters 
       DO NOT MODIFY: class and tag names effect parsers */}
      <READER_MODE_WORKAROUND__HEADINGS__SAFARI Component={Component}>
        {children}
      </READER_MODE_WORKAROUND__HEADINGS__SAFARI>
      {/* end of workaround */}

      <Component
        className={['not-prose group', styles['headingFrame'], className]
          .filter(Boolean)
          .join(' ')}
      >
        {/* ## READER MODE workaround ##
        opted to use the object tag as a workaround to hide unwanted
        elements from reader mode, as aria-hidden doesn't work on Safari */}
        <object className={styles['headingLabelFrame']} aria-hidden="true">
          <span className={styles['headingLabelHueLayer']} aria-hidden="true">
            <span className={styles['headingLabel']} aria-hidden="true">
              <a href={'#' + generateIDfromString(children as string)}>
                {children}
              </a>
            </span>
          </span>
          <span className={styles['headingLabelClone']} aria-hidden="true">
            <span
              className={'anchorLinkClipboardIcon'}
              data-testid={'copyAnchorlinkButton'}
            >
              #
            </span>
            <span className={'anchorLinkClipboardIcon--clone'}>#</span>
            {children}
          </span>
        </object>
      </Component>
    </>
  );
}
