import { act, render, screen } from '@testing-library/react';
import { YouTube } from './youtube.component';

describe('Nxdos - Documentation Site - UI - Markdoc - tags, YouTube', () => {
  let baseElement: HTMLElement, asFragment: () => DocumentFragment;

  const testVideo_props = {
    video_id: '-g3NABhePJg',
    title: 'Nx Conf 2022',
    width: '100%',
  };

  beforeEach(
    async () =>
      await act(() => {
        ({ baseElement, asFragment } = render(
          <YouTube {...testVideo_props} />
        ));
      })
  );

  it('should render YouTube component successfully', async () => {
    expect(baseElement).toBeTruthy();
    const testVideo_element = await screen.findByTestId(
      'embeddedYouTube--video'
    );
    expect(testVideo_element).toHaveProperty('src');
    expect(testVideo_element.getAttribute('video_id')).toEqual(
      testVideo_props.video_id
    );
  });

  it('should match snapshot correctly', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
