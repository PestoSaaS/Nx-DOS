import { act, render, screen } from '@testing-library/react';
import { EmbeddedCode } from './embedded-code.component';
import generateIDfromTag from '../../utils/generate-section-id';

describe('Nxdos - Documentation Site - UI - Markdoc - tags, EmbeddedCode', () => {
  let baseElement: HTMLElement, asFragment: () => DocumentFragment;

  const componentType = 'EmbeddedCode';

  const testCodeBlock_props = {
    filePath: '<!-- embedme ../../../../../../../../../.env.example -->',
    language: 'json',
    componentType: componentType as 'EmbeddedCode',
  };

  beforeEach(
    async () =>
      await act(() => {
        ({ baseElement, asFragment } = render(
          <EmbeddedCode {...testCodeBlock_props} />
        ));
      })
  );

  it('should generate valid id for section', async () => {
    const testBlockId = generateIDfromTag([], { id: 'test-id' });
    expect(testBlockId).toEqual('test-id');
  });

  it('should render EmbeddedCode component successfully', async () => {
    expect(baseElement).toBeTruthy();
    const testCodeBlock_wrapper = await screen.findByText('.env.example', {
      exact: false,
    });
    expect(testCodeBlock_wrapper).toBeTruthy();
  });

  it('should match snapshot correctly', () => {
    expect(asFragment()).toMatchSnapshot();
  });
});
