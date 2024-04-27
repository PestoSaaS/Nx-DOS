import { act, render, screen } from '@testing-library/react';

import { EmbeddedCodeBlock } from './embedded-code-block';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('Nxdos - Documentation Site - UI - Common - components, EmbeddedCodeBlock', () => {
  let baseElement: HTMLElement, asFragment: () => DocumentFragment;

  const mock_EmbeddedCodeBlockProps = {
    codeBlockID: 'test-codeblock-id',
    fileHeader: 'mock-file-path',
    codeFence: `[
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
        ]`,
  };

  beforeEach(
    async () =>
      await act(() => {
        ({ baseElement, asFragment } = render(
          <EmbeddedCodeBlock
            codeBlockID={mock_EmbeddedCodeBlockProps.codeBlockID}
            fileHeader={mock_EmbeddedCodeBlockProps.fileHeader}
            codeFence={mock_EmbeddedCodeBlockProps.codeFence}
          />
        ));
      })
  );

  it('should render EmbeddedCodeBlock component successfully', async () => {
    expect(baseElement).toBeTruthy();
    const embeddedCodeBlockHeader = await screen.findAllByText(
      'mock-file-path',
      {
        exact: false,
      }
    );
    expect(embeddedCodeBlockHeader.length).toBeGreaterThan(0);
  });

  it('should match snapshot correctly', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
