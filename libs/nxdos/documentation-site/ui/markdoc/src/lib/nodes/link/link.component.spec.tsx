import { act, render, screen } from '@testing-library/react';
import { CustomLink } from './link.component';

describe('Nxdos - Documentation Site - UI - Markdoc - nodes, Link', () => {
  let baseElement: HTMLElement, asFragment: () => DocumentFragment;
  const testLink_props = {
    href: 'https://www.algolia.com',
    passHref: false,
    replace: false,
    scroll: true,
    shallow: false,
    children: 'test link label',
  };

  beforeEach(
    async () =>
      await act(() => {
        ({ baseElement, asFragment } = render(
          <CustomLink {...testLink_props} />
        ));
      })
  );

  it('should render Link component successfully', async () => {
    expect(baseElement).toBeTruthy();
    const testLink_element = await screen.findByText('test link label', {
      exact: false,
    });
    expect(testLink_element).toHaveProperty('href');
    expect(testLink_element.getAttribute('href')).toEqual(testLink_props.href);
  });

  it('should match snapshot correctly', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
