import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import posthog from 'posthog-js';

import '../styles/main.css';
import '../styles/variables.css';
import '../styles/fonts.css';
import {
  ThemeContextProvider,
  updateSiteIcons,
  getColorThemeStyles,
  SELECTED_THEMES,
} from '@nxdos/documentation-site/ui/common';

// This ensures that as long as we are client-side, posthog is always ready
// NOTE: If set as an environment variable be sure to prefix with `NEXT_PUBLIC_`, for more info see;
// https://nextjs.org/docs/app/building-your-application/configuring/environment-variables#runtime-environment-variables
const toggle_posthog =
  typeof window !== 'undefined' &&
  typeof process.env['NEXT_PUBLIC_POSTHOG_PROJECT_API_KEY'] !== 'undefined' &&
  typeof process.env['NEXT_PUBLIC_POSTHOG_API_HOST'] !== 'undefined' &&
  process.env['NODE_ENV'] === 'production' &&
  process.env['NEXT_PUBLIC_VALID_PRODUCTION_HOSTS']
    .split(' ')
    .includes(window.location.hostname);

if (toggle_posthog) {
  posthog.init(process.env['NEXT_PUBLIC_POSTHOG_PROJECT_API_KEY'], {
    api_host: '/ingest',
    ui_host: 'https://eu.i.posthog.com',
    loaded: (posthog) => {
      if (!toggle_posthog) posthog.opt_out_capturing();
    },
  });
}

function CustomApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // // Update favicon & apple-touch icons
    updateSiteIcons();

    // Track page views
    const handleRouteChange = (path: string) => {
      if (
        process.env['NODE_ENV'] === 'production' &&
        process.env['NEXT_PUBLIC_VALID_PRODUCTION_HOSTS']
          .split(' ')
          .includes(window.location.hostname)
      ) {
        posthog.capture('$pageview');
      }
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const defaultColorTheme = getColorThemeStyles(SELECTED_THEMES.defaultTheme);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=0.85, minimum-scale=0.85, viewport-fit=cover"
        />
        <style>{defaultColorTheme}</style>
        <title>Nx-DOS</title>
      </Head>
      <main className="app">
        <ThemeContextProvider>
          <Component {...pageProps} />
        </ThemeContextProvider>
      </main>
    </>
  );
}

export default CustomApp;
