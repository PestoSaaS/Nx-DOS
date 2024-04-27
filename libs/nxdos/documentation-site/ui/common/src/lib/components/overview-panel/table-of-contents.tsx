import { TocItemMeta } from '@nxdos/documentation-site/models/document';
import { MutableRefObject, useEffect, useReducer, useRef } from 'react';
import { DecorativeBorder } from './decorative-border';
import styles from './table-of-contents.module.css';

export interface TableOfContentsProps {
  tocList: TocItemMeta[];
  closePanelActionHandler?: () => void;
}

export const TableOfContents = (props: TableOfContentsProps): JSX.Element => {
  const [activeSections, setActiveSections] = useReducer(
    (state: Record<string, boolean>, updates: Record<string, boolean>) => ({
      ...state,
      ...updates,
    }),
    {}
  );

  useEffect(() => {
    toggleAutoScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.tocList]);

  const scrollThrottle = useRef<null | number>(null);
  const scrollTimer = useRef<null | ReturnType<typeof setTimeout>>(null);
  const throttleDuration = 150; // ms
  const autoScrollDisabled = useRef<boolean>(false);
  const autoScrollDisableTimer = useRef<null | ReturnType<typeof setTimeout>>(
    null
  );
  const autoScrollDisableDuration = 500; // ms

  const toggleAutoScroll = () => {
    autoScrollDisabled.current = true;
    // autoscroll disabled
    autoScrollDisableTimer.current = setTimeout(() => {
      // autoscroll enabled
      autoScrollDisabled.current = false;
      autoScrollDisableTimer.current = null;
      scrollThrottle.current = null;
    }, autoScrollDisableDuration);
  };

  const toc = props.tocList.map((tocItem) => {
    const observerGenerator = (
      ref: MutableRefObject<HTMLElement>
    ): IntersectionObserver | null => {
      let observer = null;
      if (typeof window !== 'undefined') {
        observer = new window.IntersectionObserver(
          (entries) => {
            /* istanbul ignore next */
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                // ENTRY
                const currentScrollLevel = ref.current.parentElement?.scrollTop;
                const tocItemScrollLevel = ref.current.offsetTop;

                if (scrollTimer.current !== null) {
                  clearTimeout(scrollTimer.current);
                }

                if ((currentScrollLevel as number) > tocItemScrollLevel) {
                  // scroll direction upwards
                  if (
                    scrollThrottle.current === null ||
                    ref.current.offsetTop < scrollThrottle.current
                  ) {
                    scrollThrottle.current = ref.current.offsetTop;
                  }
                } else if (
                  (currentScrollLevel as number) < tocItemScrollLevel
                ) {
                  // scroll direction downwards
                  if (
                    scrollThrottle.current === null ||
                    ref.current.offsetTop > scrollThrottle.current
                  ) {
                    scrollThrottle.current = ref.current.offsetTop;
                  }
                }

                if (!autoScrollDisabled.current) {
                  scrollTimer.current = setTimeout(() => {
                    if (
                      scrollThrottle.current !== null &&
                      !autoScrollDisabled.current &&
                      ref.current !== null
                    ) {
                      ref.current.parentElement?.scrollTo({
                        top: Math.max(scrollThrottle.current - 100, 0),
                        left: 0,
                        behavior: 'smooth',
                      });
                    }
                    scrollThrottle.current = null;
                    scrollTimer.current = null;
                  }, throttleDuration);
                }
                setActiveSections({ [entry.target.id]: true });
                return;
              }
              //EXIT
              setActiveSections({ [entry.target.id]: false });
            });
          },
          {
            root: null,
            threshold: 0.01, // set offset 0.1 means trigger if atleast 10% of element in viewport
          }
        );
      }
      return observer;
    };

    return (
      <TocItem
        sectionTitle={tocItem.sectionTitle}
        anchorLink={tocItem.anchorLink}
        sectionInset={tocItem.sectionInset}
        key={tocItem.key}
        observerGenerator={
          observerGenerator as (
            ref: MutableRefObject<HTMLElement | null>
          ) => IntersectionObserver | null
        }
        sectionTag={tocItem.sectionTag}
        isAmongVisibleAnchors={activeSections[tocItem.anchorLink]}
        closePanelActionHandler={props.closePanelActionHandler}
        toggleAutoScroll={toggleAutoScroll}
      />
    );
  });

  return props.tocList.length !== 0 ? (
    <div className={styles['tocWrapper']}>
      <DecorativeBorder />
      <div className={styles['opTitleFrame']}>
        <div className={styles['opTitleLabel']}>Table of Contents</div>
      </div>
      <ul id={'tocFrame'} className={styles['tocFrame'] + ' tocFrame'}>
        {toc}
      </ul>
    </div>
  ) : (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <></>
  );
};

interface TocItemProps {
  sectionTitle: string;
  sectionInset: string;
  anchorLink: string;
  observerGenerator?: (
    ref: MutableRefObject<HTMLElement | null>
  ) => IntersectionObserver | null;
  isAmongVisibleAnchors?: boolean;
  sectionTag?: string;
  closePanelActionHandler?: () => void;
  toggleAutoScroll?: () => void;
}

const TocItem = (props: TocItemProps): JSX.Element => {
  const tocItemRef = useRef(null);
  useEffect(() => {
    const el = document.querySelector(`[id="${props.anchorLink}"]`);
    if (
      props.observerGenerator !== null &&
      typeof el !== 'undefined' &&
      el &&
      props.observerGenerator !== undefined
    ) {
      const observer = props.observerGenerator(tocItemRef);
      observer?.observe(el);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.sectionTitle]);

  const clickHandler = () => {
    if (props.toggleAutoScroll) {
      props.toggleAutoScroll();
    }
    if (props.closePanelActionHandler) {
      props.closePanelActionHandler();
    }
  };

  return (
    <li className={styles['tocListItem']} ref={tocItemRef}>
      <a
        href={'#' + props.anchorLink}
        onClick={clickHandler}
        data-testid={'tocItem-' + props.anchorLink}
      >
        <span className={styles['sectionLabelInset']}>
          {props.sectionInset}
        </span>
        <span
          className={
            styles['sectionLabel'] +
            ' ' +
            (props.isAmongVisibleAnchors ? styles['activeSection'] : '')
          }
        >
          <span
            className={
              styles['sectionLabel-hoverMarker'] +
              ' ' +
              styles['sectionLabel-hoverMarker-left']
            }
          >
            {'['}
          </span>
          <span
            className={
              styles['sectionTitle'] +
              ' ' +
              (props.sectionTag === 'embeddedCode'
                ? styles['sectionType--tag']
                : '')
            }
          >
            {props.sectionTitle}
          </span>
          <span className={styles['sectionLabel-hoverMarker']}>{']'}</span>
        </span>
      </a>
    </li>
  );
};
