import { RenderableTreeNode } from '@markdoc/markdoc';

export const generateIDfromTag = (
  children: RenderableTreeNode[],
  attributes: Record<string, unknown>
) => {
  if (attributes['id'] && typeof attributes['id'] === 'string') {
    return attributes['id'];
  }
  const headingContent = children
    .filter((child) => typeof child === 'string')
    .join(' ');

  return generateIDfromString(headingContent);
};

export const generateIDfromString = (inputString: string) => {
  return inputString
    .replace(/[?]/g, '')
    .replace("'", '')
    .replace(/[^a-zA-Z0-9]/g, '-')
    .replace(' ', '')
    .toLowerCase();
};

export const transformEmbeddedCodeFilePath = (filePath: string) => {
  const transformedFilePath = filePath
    .replaceAll('../', '')
    .replace('<!-- embedme ', '/')
    .replace('-->', '')
    .replace(' ', '');

  return transformedFilePath;
};

export default generateIDfromTag;
