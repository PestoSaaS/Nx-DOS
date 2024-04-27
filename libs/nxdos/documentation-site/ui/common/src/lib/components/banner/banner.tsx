import styles from './banner.module.css';

import { Logo, GithubIcon, updateSiteIcons } from '../../..';
import Link from 'next/link';

import { CSSProperties, PropsWithChildren, useEffect } from 'react';
import {
  DelayTimer,
  AnimationTimer,
  iterateTimer,
} from '../../utils/randomized-animations';
import { useThemeContext } from '../../utils/theme-context-provider';
import { GradientBg } from './gradient-bg';
import {
  LuminousBorderBgLayer,
  LuminousBorderFrontLayer,
  LuminousBorderReflectionLayer,
} from './luminous-border';
import { DecorativeBorder } from '../overview-panel/decorative-border';
import { useRouter } from 'next/router';

interface BannerProps {
  titleText: string;
  captionText: string;
  sections?: {
    sectionInset: string;
    sectionTitle: string;
    anchorLink: string;
  }[];
  configurationFlags?: BannerConfigurationFlags;
}

interface BannerConfigurationFlags {
  hasBlurOnClone?: boolean;
  hasGlowOnLogo?: boolean;
  hasGlowOnCaptions?: boolean;
  hasDropShadow?: boolean;
  hasLuminousBorders?: boolean;
  hasHeaderPattern?: boolean;
  hasDimOnHeaderPattern?: boolean;
  hasReflectionOnHeaderPattern?: boolean;
  hasHeaderPatternOnClone?: boolean;
}

interface BannerLayerProps {
  titleText: string;
  captionText: string;
  isAnimationRevealed: boolean;
  shadowLayersDepth: number;
  layerIndex?: number;
  configurationFlags?: BannerConfigurationFlags;
  logoClickHandler?: () => void;
  animationProps: {
    onAnimationEnd: () => void;
  };
  replicaAnimationToggled: boolean;
}

interface TocItemProps {
  sectionTitle: string;
  sectionInset: string;
  anchorLink: string;
}

export function Banner(props: PropsWithChildren<BannerProps>): JSX.Element {
  const themeState = useThemeContext();
  const router = useRouter();

  const DITHERED_BG_ENABLED = true;
  const GLOWING_GRADIENT_BG_ENABLED = true;
  const GLOWING_LOGO_ENABLED = true;
  const GLOWING_CAPTIONS_ENABLED = true;
  const BANNER_DROP_SHADOW_ENABLED = true;
  const BLUR_ON_SHADOW_CLONE_ENABLED = true;
  const HEADER_PATTERN_ENABLED = true;
  const REFLECTION_ON_HEADER_PATTERN_ENABLED = true;
  const DIM_ON_HEADER_PATTERN_ENABLED = false;
  const HEADER_PATTERN_ON_SHADOW_CLONE_ENABLED = true;
  const LUMINOUS_BORDERS_ENABLED = true;

  // this is computationally intensive, not suggested more than 2-3 layers
  const SHADOW_LAYERS_DEPTH = 1; // An integer 0 or above

  const defaultConfigurationFlags = {
    hasBlurOnClone: BLUR_ON_SHADOW_CLONE_ENABLED,
    hasGlowOnLogo: GLOWING_LOGO_ENABLED,
    hasGlowOnCaptions: GLOWING_CAPTIONS_ENABLED,
    hasDropShadow: BANNER_DROP_SHADOW_ENABLED,
    hasLuminousBorders: LUMINOUS_BORDERS_ENABLED,
    hasHeaderPattern: HEADER_PATTERN_ENABLED,
    hasDimOnHeaderPattern:
      HEADER_PATTERN_ENABLED && DIM_ON_HEADER_PATTERN_ENABLED,
    hasReflectionOnHeaderPattern:
      HEADER_PATTERN_ENABLED && REFLECTION_ON_HEADER_PATTERN_ENABLED,
    hasHeaderPatternOnClone:
      HEADER_PATTERN_ENABLED && HEADER_PATTERN_ON_SHADOW_CLONE_ENABLED,
  };

  const logoClickHandler = () => {
    themeState.changeTheme();
  };

  const layerProps = {
    titleText: props.titleText,
    captionText: props.captionText,
    isAnimationRevealed: themeState.bannerAnimationState.isRevealed
      ? themeState.bannerAnimationState.isRevealed
      : false,
    configurationFlags: {
      ...defaultConfigurationFlags,
      ...props.configurationFlags,
    },
    logoClickHandler,
  };

  const flickerAnimationTimer: AnimationTimer = {
    // Animation distribution
    mean: 50,
    stdDev: 750,
    skew: 100,
    minRange: 300,
    maxRange: 4000,
    callback: () => {
      return;
    },
  };

  const flickerDelayTimer: DelayTimer = {
    // Delay distribution
    mean: 1500,
    stdDev: 4000,
    skew: 100,
    minRange: 25,
    maxRange: 25000,
    callback: () => {
      return;
    },
  };

  const flickerTimers = {
    flickerAnimationTimer,
    flickerDelayTimer,
  };

  const onAnimationEnd = () => {
    if (!themeState.bannerAnimationState.isRevealed) {
      themeState.bannerAnimationState.setStatus(true);
    }
  };

  const animationProps = {
    onAnimationEnd: onAnimationEnd,
  };

  /* istanbul ignore next */
  const scrollToAnchor = (path: string) => {
    const anchor = path.split('#').pop();
    if (typeof anchor !== 'undefined') {
      setTimeout(() => {
        document.getElementById(anchor)?.scrollIntoView();
      }, 100);
    }
    router.events.off('routeChangeComplete', scrollToAnchor);
    router.events.off('hashChangeComplete', scrollToAnchor);
  };

  /* istanbul ignore next */
  const navHandler = (event: React.MouseEvent<HTMLElement>) => {
    router.events.on('routeChangeComplete', scrollToAnchor);
    router.events.on('hashChangeComplete', scrollToAnchor);
  };

  const TocItem = (props: TocItemProps): JSX.Element => {
    return (
      <li className={styles['banner--tocItem']}>
        <Link href={props.anchorLink} scroll={false} onClick={navHandler}>
          <span className={styles['banner--tocItem-labelInset']}>
            {props.sectionInset}
          </span>
          <span className={styles['banner--tocItem-label']}>
            <span className={styles['banner--tocItem-hoverMarker']}>{'['}</span>
            <span className={styles['banner--tocItem-label--text']}>
              {props.sectionTitle}
            </span>
            <span className={styles['banner--tocItem-hoverMarker']}>{']'}</span>
          </span>
        </Link>
      </li>
    );
  };

  const generateAnimationLoop = () => {
    const animationLoop: {
      animationDuration: number;
      delayDuration: number;
    }[] = [];

    const NUM_OF_FLICKERS_PER_CYCLE = 15;
    let totalAnimationTime = 0;

    const animationCSS_header = `
  @keyframes hue-flicker {
    0% {
      backdrop-filter: hue-rotate(var(--theme-hue-rotation-total));
      -webkit-backdrop-filter: hue-rotate(var(--theme-hue-rotation-total));
    }`;
    const animationCSS_replica_header = `
  @keyframes hue-flicker-replica {
    0% {
      backdrop-filter: hue-rotate(var(--theme-hue-rotation-total));
      -webkit-backdrop-filter: hue-rotate(var(--theme-hue-rotation-total));
    }`;
    const animationCSS_tail = `
    100% {
      backdrop-filter: hue-rotate(var(--theme-hue-rotation-total));
      -webkit-backdrop-filter: hue-rotate(var(--theme-hue-rotation-total));
    }
  }`;
    let animationCSS_body = ``;

    for (let i = 0; i < NUM_OF_FLICKERS_PER_CYCLE; i++) {
      iterateTimer(flickerTimers.flickerAnimationTimer);
      iterateTimer(flickerTimers.flickerDelayTimer);
      if (typeof flickerTimers.flickerDelayTimer.duration !== 'undefined') {
        animationLoop.push({
          animationDuration: flickerTimers.flickerAnimationTimer
            .duration as number,
          delayDuration: flickerTimers.flickerDelayTimer.duration as number,
        });
        totalAnimationTime += ((flickerTimers.flickerAnimationTimer
          .duration as number) +
          flickerTimers.flickerDelayTimer.duration) as number;
      }
    }
    let animationLoopPercentage = 0;

    for (let i = 0; i < NUM_OF_FLICKERS_PER_CYCLE; i++) {
      const delayStepKeyframe =
        animationLoopPercentage +
        Number(
          Number(
            (100 * animationLoop[i].delayDuration) / totalAnimationTime
          ).toPrecision(3)
        );

      const animationStepKeyframe =
        Number(delayStepKeyframe) +
        Number(
          Number(
            (100 * animationLoop[i].animationDuration) / 2 / totalAnimationTime
          ).toPrecision(3)
        );
      const animationEndKeyframe =
        Number(delayStepKeyframe) +
        Number(
          Number(
            (100 * animationLoop[i].animationDuration) / totalAnimationTime
          ).toPrecision(3)
        );

      animationCSS_body += `
    ${Math.min(delayStepKeyframe, 100).toPrecision(3)}% {
      backdrop-filter: hue-rotate(var(--theme-hue-rotation-total));
      -webkit-backdrop-filter: hue-rotate(var(--theme-hue-rotation-total));
    }
    ${Math.min(animationStepKeyframe, 100).toPrecision(3)}% {
      backdrop-filter: hue-rotate(0);
      -webkit-backdrop-filter: hue-rotate(0);
    }
    ${Math.min(animationEndKeyframe, 100).toPrecision(3)}% {
      backdrop-filter: hue-rotate(var(--theme-hue-rotation-total));
      -webkit-backdrop-filter: hue-rotate(var(--theme-hue-rotation-total));
    }
    `;
      animationLoopPercentage = Number(animationStepKeyframe);
    }

    return {
      animationCSS: animationCSS_header + animationCSS_body + animationCSS_tail,
      animationCSS_replica:
        animationCSS_replica_header + animationCSS_body + animationCSS_tail,
      totalAnimationTime: totalAnimationTime,
    };
  };

  let flickerAnimation = generateAnimationLoop();
  let animationCSS = flickerAnimation.animationCSS;
  let animationCSS_replica = flickerAnimation.animationCSS_replica;
  let totalAnimationTime = flickerAnimation.totalAnimationTime;
  let colorThemeStyles = themeState.getColorThemeStyles(
    themeState.selectedThemes?.defaultTheme
  );

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    flickerAnimation = generateAnimationLoop();
    animationCSS = flickerAnimation.animationCSS;
    animationCSS_replica = flickerAnimation.animationCSS_replica;
    totalAnimationTime = flickerAnimation.totalAnimationTime;
    colorThemeStyles = themeState.getColorThemeStyles(
      themeState.selectedThemes?.defaultTheme
    );
    setTimeout(() => {
      updateSiteIcons(themeState.selectedThemes.defaultTheme);
    }, 100);
  }, [themeState.selectedThemes]);
  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <div
      data-testid="bannerWrapper"
      className={styles['bannerWrapper']}
      style={
        {
          '--flicker-duration-ms': `${totalAnimationTime}`,
          '--dithered-bg-enabled':
            String(DITHERED_BG_ENABLED ? 1 : 0) + ` !important;`,
        } as CSSProperties
      }
      suppressHydrationWarning
    >
      <style data-testid="colorThemeCSS">{colorThemeStyles}</style>
      <style data-testid="randomizedAnimationCSS" suppressHydrationWarning>
        {themeState.isReplicaToggled ? animationCSS_replica : animationCSS}
      </style>
      {themeState.bannerAnimationState.isRevealed && (
        <style suppressHydrationWarning>{`
        :root {
        --flicker-duration-ms: ${totalAnimationTime} !important;
        }
        `}</style>
      )}
      {GLOWING_GRADIENT_BG_ENABLED && (
        <GradientBg
          className={
            'absolute w-[100%] h-[100%] flex justify-center grid content-center'
          }
          mousePosition={{ x: 1, y: 1 }}
        />
      )}
      {DITHERED_BG_ENABLED && <div className={styles['bannerWrapperBg']} />}
      <div className={styles['bannerFrame']}>
        <div className={styles['bannerSpacer']} />
        <div className={styles['banner']}>
          <BannerLayer
            {...layerProps}
            shadowLayersDepth={SHADOW_LAYERS_DEPTH}
            animationProps={animationProps}
            replicaAnimationToggled={themeState.isReplicaToggled}
          />

          {typeof props.sections !== 'undefined' &&
            props.sections.length > 0 && (
              <div
                className={styles['banner--section']}
                style={
                  {
                    zIndex: '10',
                    '--shadow-layer-ratio': `1`,
                  } as CSSProperties
                }
              >
                <div className={styles['banner-alt--shadow']}>
                  <div className={styles['banner-alt--shadow-drop']} />
                  <div className={styles['banner-alt--shadow-bg']} />
                </div>
                <div className={styles['banner--innerFrame']}>
                  <div className={styles['banner--toc']}>
                    <DecorativeBorder />
                    <div className={styles['banner--toc--title-frame']}>
                      <div className={styles['banner--toc--title-label']}>
                        v 0.0.1
                      </div>
                    </div>
                    <ul className={styles['tocFrame']}>
                      {props.sections.map((section, idx) => {
                        return (
                          <TocItem
                            key={idx}
                            sectionInset={section.sectionInset}
                            sectionTitle={section.sectionTitle}
                            anchorLink={section.anchorLink}
                          />
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            )}
        </div>
        <div className={styles['bannerSpacer']} />
      </div>
    </div>
  );
}

const BannerLayer = (props: PropsWithChildren<BannerLayerProps>) => {
  const layerIndex =
    typeof props.layerIndex !== 'undefined'
      ? props.layerIndex
      : props.shadowLayersDepth;

  return (
    <div
      className={styles['banner--section']}
      style={
        {
          '--shadow-layer-ratio': `${String(
            props.shadowLayersDepth === 0
              ? 1
              : layerIndex / props.shadowLayersDepth
          )}`,
        } as CSSProperties
      }
    >
      <div className={styles['banner-alt--shadow']}>
        {props.configurationFlags?.hasDropShadow &&
          typeof props.layerIndex === 'undefined' && (
            <div className={styles['banner-alt--shadow-drop']} />
          )}

        {typeof props.layerIndex === 'undefined' && (
          <div className={styles['banner-alt--shadow-bg']} />
        )}

        <div className={styles['banner--section--shadowCloneMaskLayer']}>
          {layerIndex > 0 ? (
            <BannerLayer
              {...props}
              shadowLayersDepth={props.shadowLayersDepth}
              layerIndex={layerIndex - 1}
              replicaAnimationToggled={props.replicaAnimationToggled}
            />
          ) : (
            // eslint-disable-next-line react/jsx-no-useless-fragment
            <></>
          )}
        </div>

        {props.configurationFlags?.hasHeaderPatternOnClone && (
          <div className={styles['banner--header']}>
            {props.configurationFlags?.hasReflectionOnHeaderPattern && (
              <div
                className={styles['banner-alt--header--bg-pattern--reflection']}
              />
            )}
            {props.configurationFlags?.hasDimOnHeaderPattern && (
              <div className={styles['banner--header--bg-pattern']} />
            )}
          </div>
        )}
      </div>

      {props.configurationFlags?.hasLuminousBorders && (
        <LuminousBorderBgLayer />
      )}
      <div
        className={
          styles['banner--innerFrame'] + ' ' + styles['banner-alt--innerFrame']
        }
      >
        {props.configurationFlags?.hasLuminousBorders && (
          <LuminousBorderReflectionLayer />
        )}

        <div className={styles['banner--header']}>
          {props.configurationFlags?.hasReflectionOnHeaderPattern &&
            typeof props.layerIndex === 'undefined' && (
              <div
                className={styles['banner-alt--header--bg-pattern--reflection']}
              />
            )}

          {props.configurationFlags?.hasDimOnHeaderPattern &&
            typeof props.layerIndex === 'undefined' && (
              <div className={styles['banner--header--bg-pattern']} />
            )}

          {props.configurationFlags?.hasHeaderPattern &&
            typeof props.layerIndex === 'undefined' && (
              <div
                className={styles['banner-alt--header--bg-pattern']}
                style={{
                  backgroundImage: `radial-gradient( circle at ${1}px ${1}px, rgba(var(--theme-gradient-bg-color-rgb), 0.14), rgba(var(--theme-gradient-bg-color-rgb), 0.10) 25%, rgba(var(--theme-gradient-bg-color-rgb), 0.06) 50%, transparent 80% )`,
                }}
              />
            )}

          {props.configurationFlags?.hasGlowOnLogo &&
            typeof props.layerIndex === 'undefined' && (
              <div className={styles['banner--logo-group--blur']}>
                <Logo className={styles['banner--header-logo']} />
                <div
                  className={
                    styles['banner--logo-group'] +
                    ' ' +
                    styles['banner--logo-group--glowLayer']
                  }
                  style={
                    props.isAnimationRevealed
                      ? ({
                          animationName: props.replicaAnimationToggled
                            ? 'hue-flicker-replica'
                            : 'hue-flicker',
                          animationIterationCount: 'infinite',
                          animationDuration: 'var(--flicker-duration)',
                          animationDelay: '0ms',
                        } as CSSProperties)
                      : {}
                  }
                >
                  <Logo className={styles['banner--header-logo']} />
                  <div
                    className={styles['banner--logo-group--animationLayer']}
                    style={
                      props.isAnimationRevealed
                        ? ({
                            animationName: props.replicaAnimationToggled
                              ? 'hue-flicker-replica'
                              : 'hue-flicker',
                            animationIterationCount: 'infinite',
                            animationDuration: 'var(--flicker-duration)',
                            animationDelay: '0ms',
                          } as CSSProperties)
                        : {}
                    }
                  />
                </div>
              </div>
            )}

          <div className={styles['banner--logo-group']}>
            <Logo className={styles['banner--header-logo']} />
            <div
              className={styles['banner--logo-group--animationLayer']}
              style={
                props.isAnimationRevealed
                  ? ({
                      animationName: props.replicaAnimationToggled
                        ? 'hue-flicker-replica'
                        : 'hue-flicker',
                      animationIterationCount: 'infinite',
                      animationDuration: 'var(--flicker-duration)',
                      animationDelay: '0ms',
                    } as CSSProperties)
                  : {}
              }
              {...(typeof props.layerIndex === 'undefined'
                ? { 'data-testid': 'animationLayer' }
                : {})}
              onAnimationEnd={props.animationProps.onAnimationEnd}
            />
            <div className={styles['banner--logo-group--brightnessFilter']} />
            <div
              className={styles['banner--logo-clickZone']}
              {...(typeof props.layerIndex === 'undefined'
                ? {
                    'data-testid': 'banner--logo-clickZone',
                    onClick:
                      typeof props.logoClickHandler !== 'undefined'
                        ? props.logoClickHandler
                        : /* istanbul ignore next */
                          () => {
                            return;
                          },
                  }
                : {})}
            />
            <div className={styles['banner--logo-group--hoverLayer']} />
          </div>

          <div className={styles['banner--header-caption']}>
            {props.titleText}
            <br />
          </div>
          {props.configurationFlags?.hasGlowOnCaptions && (
            <div className={styles['banner--header-caption--glowLayer']}>
              <div className={styles['banner--header-caption--glowLayer-bg']} />
              {props.titleText}
              <br />
            </div>
          )}
          <Link href={'/introduction'}>
            <div className={styles['banner--header-button']}>
              <div className={styles['banner--header-button-label']}>
                documentation
              </div>
            </div>
          </Link>
          <a
            target="_blank"
            href="https://github.com/PestoSaaS/Nx-DOS"
            rel="noopener noreferrer"
            aria-label="PestoSaaS github repository for Nx-DOS"
          >
            <div
              className={
                styles['banner--header-button'] + ' ' + styles['iconButton']
              }
            >
              <GithubIcon />
            </div>
          </a>
        </div>

        <div className={styles['banner--caption']}>
          {props.captionText}
          <br />
          {props.configurationFlags?.hasGlowOnCaptions && (
            <div className={styles['banner--caption--glowLayer']}>
              {props.captionText}
            </div>
          )}
        </div>

        {props.configurationFlags?.hasLuminousBorders && (
          <LuminousBorderFrontLayer />
        )}
      </div>
    </div>
  );
};
