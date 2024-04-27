import styles from './banner.module.css';
import { PropsWithChildren } from 'react';

interface GradientdivProps {
  className: string;
  mousePosition: {
    x: number;
    y: number;
  };
}

export const GradientBg = (props: PropsWithChildren<GradientdivProps>) => {
  return (
    <div
      style={{
        backgroundImage: `radial-gradient( circle at ${props.mousePosition.x}px ${props.mousePosition.y}px, rgba(var(--theme-gradient-bg-color-rgb), 0.1), rgba(var(--theme-gradient-bg-color-rgb), 0.09) 20%, rgba(var(--theme-gradient-bg-color-rgb), 0.05) 45%, transparent 75% )`,
      }}
      className={
        styles['bannerWrapperBgRadialGradient'] + ' ' + props.className
      }
    >
      {props.children}
    </div>
  );
};
