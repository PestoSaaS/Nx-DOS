import { act, render, screen } from '@testing-library/react';
import { Article } from './article';
import {
  mockIntersectionObserver,
  sample_ArticleProps,
  mock_panelStates,
} from '@shared/util/testing';
import mockRouter from 'next-router-mock';
import userEvent from '@testing-library/user-event';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('Nxdos - Documentation Site - UI - Common - components, Article', () => {
  let baseElement: HTMLElement, asFragment: () => DocumentFragment;
  // Set the initial url:
  mockRouter.push('/introduction');
  mockIntersectionObserver();
  const user = userEvent.setup();

  const panelStates = mock_panelStates();

  beforeEach(
    async () =>
      await act(() => {
        ({ baseElement, asFragment } = render(
          <Article {...sample_ArticleProps} panelStates={panelStates} />
        ));
      })
  );

  it('should render Article component successfully', async () => {
    expect(baseElement).toBeTruthy();
    const articleTitle = await screen.findAllByText(
      sample_ArticleProps.frontMatterData.title,
      {
        exact: false,
      }
    );
    expect(articleTitle.length).toBeGreaterThan(0);
  });

  it('should match snapshot correctly', () => {
    expect(asFragment()).toMatchSnapshot();
  });

  it('should display table of contents, and close panels upon click', async () => {
    const tocItem = (
      await screen.findAllByTestId(
        'tocItem-' + sample_ArticleProps.tocList[0].anchorLink
      )
    )[1];
    expect(tocItem).toBeTruthy();
    panelStates.overviewPanelState.isOpen = true;
    panelStates.searchPanelState.isOpen = true;
    await user.click(tocItem);
    expect(panelStates.overviewPanelState.isOpen).toBeFalsy();
    expect(panelStates.searchPanelState.isOpen).toBeFalsy();
  });
});
