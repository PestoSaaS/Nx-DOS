import React from 'react';
import { act, render, screen } from '@testing-library/react';
import FourOhFour from '../pages/404';
import { ThemeContextProvider } from '@nxdos/documentation-site/ui/common';
import mockRouter from 'next-router-mock';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('Route: 404', () => {
  // Set the initial url:
  mockRouter.push('/non-existent-test-url');

  let baseElement: HTMLElement, asFragment: () => DocumentFragment;

  beforeEach(async () => {
    await act(() => {
      ({ baseElement, asFragment } = render(
        <ThemeContextProvider>
          <FourOhFour />
        </ThemeContextProvider>
      ));
    });
  });

  it('should render 404 page successfully', () => {
    expect(baseElement).toBeTruthy();
    expect(screen.getAllByText('404', { exact: false })[0]).toBeTruthy();
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
