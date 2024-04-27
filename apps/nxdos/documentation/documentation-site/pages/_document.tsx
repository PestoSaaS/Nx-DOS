import { Head, Html, Main, NextScript } from 'next/document';
import { createContext, useContext, useState } from 'react';

const RevealAnimationContext = createContext(null);

export const RevealAnimationContextProvider = ({ children }) => {
  const [bannerAnimationRevealed, setBannerAnimationStatus] = useState(false);

  // Define any functions or values you want to provide
  const value = {
    bannerAnimationTracker: {
      isRevealed: bannerAnimationRevealed,
      setStatus: setBannerAnimationStatus,
    },
  };
  return (
    <RevealAnimationContext.Provider value={value}>
      {children}
    </RevealAnimationContext.Provider>
  );
};

export const useRevealAnimationContext = () =>
  useContext(RevealAnimationContext);

export default function Document(): JSX.Element {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
        />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link
          rel="preload"
          href="/fonts/noto-sans/NotoSans-Light.ttf"
          as="font"
          crossOrigin=""
          type="font/ttf"
        />
        <link
          rel="preload"
          href="/fonts/noto-sans/NotoSans-LightItalic.ttf"
          as="font"
          crossOrigin=""
          type="font/ttf"
        />
        <link
          rel="preload"
          href="/fonts/noto-sans/NotoSans-SemiBold.ttf"
          as="font"
          crossOrigin=""
          type="font/ttf"
        />
        <link
          rel="preload"
          href="/fonts/noto-sans-mono/NotoSansMono-Regular.ttf"
          as="font"
          crossOrigin=""
          type="font/ttf"
        />
        <link
          rel="preload"
          href="/fonts/ibm-vga/WebPlus_IBM_VGA_8x16.woff"
          as="font"
          crossOrigin=""
          type="font/ttf"
        />
        <script src="/polyfills/context-filter-polyfill.min.js" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
