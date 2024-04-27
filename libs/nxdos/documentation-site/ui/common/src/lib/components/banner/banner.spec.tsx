import { act, fireEvent, render, screen } from '@testing-library/react';
import { Banner } from './banner';
import { InstantSearchHooksTestWrapper } from '@shared/util/testing';

import mockRouter from 'next-router-mock';
import { ThemeContextProvider } from '../../utils/theme-context-provider';
import userEvent from '@testing-library/user-event';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('Nxdos - Documentation Site - UI - Common - components, Banner', () => {
  let baseElement: HTMLElement, asFragment: () => DocumentFragment;
  // Set the initial url:
  mockRouter.push('/introduction');

  const BANNER_TITLE = 'Nx starter guide';
  const BANNER_CAPTION =
    'OSS stack template for multiplatform apps, curated with micro SaaS projects in mind.';
  const SECTIONS = [
    {
      sectionInset: '',
      sectionTitle: 'pre-release / contributions welcome',
      anchorLink: '/acknowledgements#contributing',
    },
  ];

  beforeEach(
    async () =>
      await act(() => {
        ({ baseElement, asFragment } = render(
          <ThemeContextProvider>
            <InstantSearchHooksTestWrapper>
              <Banner
                titleText={BANNER_TITLE}
                captionText={BANNER_CAPTION}
                sections={SECTIONS}
              />
            </InstantSearchHooksTestWrapper>
          </ThemeContextProvider>
        ));
      })
  );

  it('should render banner component successfully', async () => {
    expect(baseElement).toBeTruthy();
    const bannerCaption = await screen.findAllByText('Nx starter guide', {
      exact: false,
    });
    expect(bannerCaption[0]).toBeTruthy();
  });

  it('should match snapshot correctly', () => {
    const snapshotWithNonDeterministicData = asFragment();
    const bannerWrapper = snapshotWithNonDeterministicData.querySelector(
      `[data-testid="bannerWrapper"]`
    );
    bannerWrapper?.setAttribute('style', '');
    const randomAnimationCSS = snapshotWithNonDeterministicData.querySelector(
      `[data-testid="randomizedAnimationCSS"]`
    );
    randomAnimationCSS?.remove();

    expect(snapshotWithNonDeterministicData).toMatchSnapshot();
  });

  it('should flicker animation timers', async () => {
    const animationLayer = await screen.findByTestId('animationLayer');
    const bannerWrapper = await screen.findByTestId('bannerWrapper');
    const randomAnimationCSS = await screen.findByTestId(
      'randomizedAnimationCSS'
    );

    const bannerWrapper_t0_style = bannerWrapper.getAttribute('style');
    const randomAnimationCSS_t0_style = randomAnimationCSS.innerHTML;

    fireEvent.animationEnd(animationLayer);

    const bannerWrapper_t1_style = bannerWrapper.getAttribute('style');
    const randomAnimationCSS_t1_style = randomAnimationCSS.innerHTML;

    expect(bannerWrapper_t0_style).not.toEqual(bannerWrapper_t1_style);
    expect(randomAnimationCSS_t0_style).not.toEqual(
      randomAnimationCSS_t1_style
    );
  });

  it('should change styles upon clicking logo', async () => {
    const user = userEvent.setup();
    const logoClickZone = await screen.findByTestId('banner--logo-clickZone');
    const colorThemeCSS = await screen.findByTestId('colorThemeCSS');

    const colorThemeCSS_t0_style = colorThemeCSS.innerHTML;
    await user.click(logoClickZone);
    const colorThemeCSS_t1_style = colorThemeCSS.innerHTML;

    expect(colorThemeCSS_t0_style).not.toEqual(colorThemeCSS_t1_style);
  });
});
