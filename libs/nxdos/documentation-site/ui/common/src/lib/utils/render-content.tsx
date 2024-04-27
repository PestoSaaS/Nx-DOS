import { DocumentData } from '@nxdos/documentation-site/models/document';
import {
  READER_MODE_WORKAROUND__MINCONTENT__SAFARI,
  generateIDfromString,
  renderMarkdown,
  transformEmbeddedCodeFilePath,
} from '@nxdos/documentation-site/ui/markdoc';
import ReactDOMServer from 'react-dom/server';
import { ContentSection, EmbeddedCodeBlock } from '../..';

export const renderContent = (document: DocumentData) => {
  const renderedMarkdown = renderMarkdown(document) as JSX.Element;
  const nodesFilteredForEmbeddedCode: JSX.Element[] = [];
  const sections: JSX.Element[][] = [];
  let k = 0;

  for (let i = 0; i < renderedMarkdown.props.children.length; i++) {
    if (
      renderedMarkdown.props.children[i].props.componentType === 'EmbeddedCode'
    ) {
      const codeBlockID =
        'code-' +
        generateIDfromString(
          transformEmbeddedCodeFilePath(
            renderedMarkdown.props.children[i].props.filePath
          )
        );

      const embeddedCodeBlock = (
        <EmbeddedCodeBlock
          key={codeBlockID}
          codeBlockID={codeBlockID}
          fileHeader={renderedMarkdown.props.children[i]}
          codeFence={renderedMarkdown.props.children[i + 1]}
        />
      );

      nodesFilteredForEmbeddedCode.push(embeddedCodeBlock);
      i++;
    } else {
      nodesFilteredForEmbeddedCode.push(renderedMarkdown.props.children[i]);
    }
  }

  for (let i = 0; i < nodesFilteredForEmbeddedCode.length; i++) {
    if (!sections[k]) {
      sections[k] = [];
    }
    if (nodesFilteredForEmbeddedCode[i].props.componentType === 'Heading') {
      if (sections[k].length > 0) {
        k++;
        sections[k] = [];
      }
    }
    sections[k].push(nodesFilteredForEmbeddedCode[i]);
  }

  sections[sections.length - 1].push(
    <READER_MODE_WORKAROUND__MINCONTENT__SAFARI />
  );

  const renderedContent = sections.map((section, idx) => {
    const sectionID = section[0].props.id;
    return <ContentSection key={idx} sectionID={sectionID} section={section} />;
  });

  return renderedContent;
};

export const renderContentToString = (document: DocumentData) => {
  const renderedContent = renderContent(document);
  const linenumberRegex = /(?<=linenumber)(.*?)(?=<)\+?(<)/g;
  const renderedContentHTML = ReactDOMServer.renderToString(
    renderedContent as unknown as JSX.Element
  )
    .replaceAll(linenumberRegex, '$1&nbsp;<')
    // restoring event listeners on server side rendered links to enable navigating without site refresh
    .replaceAll(
      '<a ',
      '<a onClick={(function(event){' +
        'if(event.target.target!=="_blank"){' +
        'event.preventDefault();' +
        'window.next.router.replace(event.target.href);' +
        '}})(event)} '
    );

  return renderedContentHTML;
};
