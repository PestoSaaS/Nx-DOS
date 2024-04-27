import {
  DocumentData,
  TocItemMeta,
} from '@nxdos/documentation-site/models/document';
import {
  generateIDfromString,
  parseMarkdown,
  transformEmbeddedCodeFilePath,
} from '@nxdos/documentation-site/ui/markdoc';
import { Node } from '@markdoc/markdoc';

export const collectHeadings = (document: DocumentData): TocItemMeta[] => {
  const sections: Node[] = [];
  const parsedMarkdown = parseMarkdown(document.content);

  for (let i = 0; i < parsedMarkdown.children.length; i++) {
    if (['heading', 'tag'].includes(parsedMarkdown.children[i].type)) {
      if (
        !(
          parsedMarkdown.children[i].type === 'tag' &&
          parsedMarkdown.children[i].tag !== 'embeddedCode'
        )
      ) {
        sections.push(parsedMarkdown.children[i]);
      }
    }
  }

  let listLevel = 1;
  let previousTagType = '';

  const tocList = sections.map((section, idx) => {
    let sectionTitle = '';
    let sectionInset = '';
    let anchorLink = '';

    switch (section.type) {
      case 'heading':
        listLevel = Number(section.attributes['level']);
        sectionTitle = section.children[0].children[0].attributes['content'];
        anchorLink = '' + generateIDfromString(sectionTitle);
        previousTagType = 'heading';
        break;
      case 'tag':
        if (section.tag === 'embeddedCode') {
          const filePath = section.attributes['filePath'];
          sectionTitle = filePath
            .substring(filePath.lastIndexOf('/'))
            .replace('/', '')
            .replace(' ', '')
            .replace('-->', '');
          anchorLink =
            'code-' +
            generateIDfromString(transformEmbeddedCodeFilePath(filePath));
        }
        if (previousTagType === 'heading') {
          listLevel++;
        }
        previousTagType = 'tag';
        break;
    }

    for (let i = 0; i < (listLevel - 1) * 2; i++) {
      sectionInset += String.fromCharCode(160);
    }

    return {
      sectionTitle,
      anchorLink,
      sectionInset,
      key: idx,
      sectionTag:
        section.type === 'tag' && section.tag === 'embeddedCode'
          ? 'embeddedCode'
          : '',
    };
  });

  return tocList;
};
