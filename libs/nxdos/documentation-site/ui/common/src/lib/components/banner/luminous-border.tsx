import styles from './banner.module.css';

export const LuminousBorderFrontLayer = () => {
  return (
    <div className={styles['luminousBorder']}>
      <div className={styles['luminousBorderBaseLayer']}>
        <div className={styles['luminousBorder-left']} />
        <div className={styles['luminousBorder-top']} />
      </div>
      <div className={styles['luminousBorderLowerBlurLayer']}>
        <div className={styles['luminousBorder-left']} />
        <div className={styles['luminousBorder-top']} />
      </div>
      <div className={styles['luminousBorderUpperBlurLayer']}>
        <div className={styles['luminousBorder-left']} />
        <div className={styles['luminousBorder-top']} />
      </div>
      <div className={styles['luminousBorderFrontLayer']}>
        <div className={styles['luminousBorder-left']} />
        <div className={styles['luminousBorder-top']} />
      </div>
    </div>
  );
};

export const LuminousBorderBgLayer = () => {
  return (
    <div className={styles['luminousBorder']}>
      <div className={styles['luminousBorderBackgroundIllumination']}>
        <div className={styles['luminousBorder-left']} />
        <div className={styles['luminousBorder-top']} />
      </div>
    </div>
  );
};

export const LuminousBorderReflectionLayer = () => {
  return (
    <div className={styles['luminousBorder']}>
      <div className={styles['luminousBorderSurfaceReflection']}>
        <div className={styles['luminousBorder-left']} />
        <div className={styles['luminousBorder-top']} />
      </div>
    </div>
  );
};
