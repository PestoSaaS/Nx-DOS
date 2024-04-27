import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Banner } from '@nxdos/documentation-site/ui/common';
import Head from 'next/head';

export function FourOhFour() {
  const router = useRouter();

  useEffect(() => {
    if (router.asPath !== '/404') {
      router.replace('/404');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pageTitle = 'Nx\u2011DOS / 404';
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Banner
        titleText="404 NOT FOUND"
        captionText="Ooops, the requested URL doesn't exist..."
      />
    </>
  );
}

export default FourOhFour;
