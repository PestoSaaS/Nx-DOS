import { act, render, screen } from '@testing-library/react';
import { Heading } from './heading.component';

describe('Nxdos - Documentation Site - UI - Markdoc - nodes, Heading', () => {
  let baseElement: HTMLElement, asFragment: () => DocumentFragment;

  beforeEach(
    async () =>
      await act(() => {
        ({ baseElement, asFragment } = render(
          <Heading
            id={''}
            level={0}
            className={''}
            componentType={'h1' as 'Heading'}
          >
            {'Test heading'}
          </Heading>
        ));
      })
  );

  it('should render Heading component successfully', async () => {
    expect(baseElement).toBeTruthy();
    const testHeading_content = await screen.findAllByText('Test heading', {
      exact: false,
    });
    expect(testHeading_content).toBeTruthy();
  });

  it('should match snapshot correctly', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
