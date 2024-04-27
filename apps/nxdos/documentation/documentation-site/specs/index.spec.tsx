import React from 'react';
import { act, render, screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import Index from '../pages/index';
import { ThemeContextProvider } from '@nxdos/documentation-site/ui/common';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('Route: Index', () => {
  let baseElement: HTMLElement, asFragment: () => DocumentFragment;

  mockRouter.push('/');

  beforeEach(async () => {
    await act(() => {
      ({ baseElement, asFragment } = render(
        <ThemeContextProvider>
          <Index />
        </ThemeContextProvider>
      ));
    });
  });

  it('should render landing page successfully', async () => {
    expect(baseElement).toBeTruthy();
    expect(
      (await screen.findAllByText('Nx starter guide', { exact: false }))[0]
    ).toBeTruthy();
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
});
