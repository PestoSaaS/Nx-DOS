import { DocumentData } from '@nxdos/documentation-site/models/document';
import {
  generateIDfromString,
  transformEmbeddedCodeFilePath,
} from '@nxdos/documentation-site/ui/markdoc';
import { renderContent } from './render-content';

export interface algoliaRecordSection {
  articleTitle: string;
  articlePath: string | undefined;
  sectionTitle: string;
  anchorLink: string;
  sectionURL: string;
  sectionContent: string;
  sectionOrder: number;
  subsectionOrder: number;
  subsectionURL: string;
}

export const collectSections = async (
  document: DocumentData,
  overrideURL?: string
): Promise<algoliaRecordSection[]> => {
  const sections = [];

  const renderedContent = await renderContent(document);

  let j = 1;
  for (let i = 0; i < renderedContent.length; i++) {
    if (
      renderedContent[i].props &&
      renderedContent[i].props['section'] &&
      renderedContent[i].props['section'].length > 0
    ) {
      if (
        renderedContent[i].props['section'][0].props.componentType === 'Heading'
      ) {
        const chunkLimit = 4000;

        const section = {
          articleTitle: document.frontMatterData.title,
          articlePath: overrideURL
            ? overrideURL
            : document.filePath
                .split('public/documentation')
                .pop()
                ?.replace('.mdx', ''),
          sectionTitle: renderedContent[i].props['section'][0].props.children,
          anchorLink: renderedContent[i].props['sectionID'],
          sectionURL:
            (overrideURL
              ? overrideURL
              : document.filePath
                  .split('public/documentation')
                  .pop()
                  ?.replace('.mdx', '')) +
            '#' +
            renderedContent[i].props['sectionID'],
          sectionContent: '',
          sectionOrder: j++,
          subsectionOrder: 0,
          subsectionURL: '',
        };

        // eslint-disable-next-line no-loop-func
        const getNodeText = (
          node: JSX.Element
        ): string | JSX.Element | undefined => {
          if (node?.type?.name === 'CustomLink') {
            return (
              '[' +
              getNodeText(node?.props?.children) +
              '](' +
              node?.props?.href +
              ')'
            );
          }
          if (['string', 'number'].includes(typeof node)) return node;
          if (node?.type?.name === 'EmbeddedCodeBlock') {
            const codeBlockID = generateIDfromString(
              transformEmbeddedCodeFilePath(
                node.props.fileHeader.props.filePath
              )
            );

            const codeBlockAnchorLink = 'code-' + codeBlockID;
            let codeSectionContent = [
              node.props.fileHeader.props.filePath
                .replace('<!-- embedme ', '')
                .replace('-->', ''),
              String(getNodeText(node.props.codeFence)),
            ].join(', ');

            let k = 1;

            const cloneSection = { ...section };
            const filePath = node.props.fileHeader.props.filePath;

            cloneSection.sectionContent = codeSectionContent;
            cloneSection.sectionTitle = filePath
              .substring(filePath.lastIndexOf('/'))
              .replace('/', '')
              .replace(' ', '')
              .replace('-->', '');
            cloneSection.sectionOrder = j++;
            cloneSection.subsectionOrder = k;
            cloneSection.anchorLink = codeBlockAnchorLink;
            cloneSection.sectionURL =
              cloneSection.articlePath + '#' + cloneSection.anchorLink;

            while (codeSectionContent.length > chunkLimit) {
              cloneSection.sectionContent = codeSectionContent.substring(
                0,
                chunkLimit
              );
              sections.push({ ...cloneSection });
              k++;
              cloneSection.subsectionOrder = k;
              codeSectionContent = codeSectionContent.substring(
                chunkLimit,
                codeSectionContent.length
              );
            }
            sections.push({ ...cloneSection });

            return '';
          }

          if (node instanceof Array) return node.map(getNodeText).join(' ');
          if (typeof node === 'object' && node) {
            if (node.props.children) {
              return getNodeText(node.props.children);
            } else {
              return '';
            }
          } else {
            return node;
          }
        };

        const sectionToParse = renderedContent[i].props['section'];

        let r = 0;
        for (let p = 0; p < sectionToParse.length; p++) {
          r++;
          section.subsectionOrder = r;
          section.subsectionURL =
            section.sectionURL + '?s=' + String(section.subsectionOrder);

          let sectionContent = getNodeText(sectionToParse[p]) as string;

          section.sectionContent = sectionContent;

          /* istanbul ignore next */
          while (sectionContent.length > chunkLimit) {
            section.sectionContent = sectionContent.substring(0, chunkLimit);
            sections.push({ ...section });
            r++;
            section.subsectionOrder = r;
            section.subsectionURL =
              section.sectionURL + '?s=' + String(section.subsectionOrder);
            sectionContent = sectionContent.substring(
              chunkLimit,
              sectionContent.length
            );
          }

          if (section.sectionContent !== '') {
            sections.push({ ...section });
          }
        }
      }
    }
  }

  return sections;
};
