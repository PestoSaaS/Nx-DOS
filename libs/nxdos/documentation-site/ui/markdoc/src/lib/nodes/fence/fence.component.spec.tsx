import { act, render, screen } from '@testing-library/react';
import { Fence } from './fence.component';

describe('Nxdos - Documentation Site - UI - Markdoc - nodes, Fence', () => {
  let baseElement: HTMLElement, asFragment: () => DocumentFragment;
  const testFence_language = 'json{2:3}';
  const testFence_children = `[
    {
      "name": "Nx-DOS",
      "path": "nxdos",
      "isFolder": true,
      "itemList": [
        {
          "name": "introduction",
          "path": "nxdos/introduction",
          "overrideURL": "introduction"
        },
        {
          "name": "getting-started",
          "path": "nxdos/getting-started",
          "overrideURL": "getting-started"
        }
      ]
    }
  ]`;

  beforeEach(
    async () =>
      await act(() => {
        ({ baseElement, asFragment } = render(
          <Fence language={testFence_language}>{testFence_children}</Fence>
        ));
      })
  );

  it('should render Fence component successfully', async () => {
    expect(baseElement).toBeTruthy();
    const fencedCodeString = await screen.findByText('Nx-DOS', {
      exact: false,
    });
    const linenumber = await screen.findByText('10', { exact: false });
    expect(fencedCodeString).toBeTruthy();
    expect(linenumber).toBeTruthy();
  });

  it('should match snapshot correctly', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
