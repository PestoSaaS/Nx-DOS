import { Node, parse, renderers, transform } from '@markdoc/markdoc';
import React, { ReactNode } from 'react';
import {
  generateIDfromTag,
  generateIDfromString,
  transformEmbeddedCodeFilePath,
} from './lib/utils/generate-section-id';
import { CustomLink } from './lib/nodes/link/link.component';
import { link } from './lib/nodes/link/link.schema';
import { Fence } from './lib/nodes/fence/fence.component';
import { fence } from './lib/nodes/fence/fence.schema';
import { Heading } from './lib/nodes/heading/heading.component';
import { heading } from './lib/nodes/heading/heading.schema';

import { EmbeddedCode } from './lib/tags/embedded-code/embedded-code.component';
import { embeddedCode } from './lib/tags/embedded-code/embedded-code.schema';
import { YouTube } from './lib/tags/youtube/youtube.component';
import { youtube } from './lib/tags/youtube/youtube.schema';

import { InjectMissingCSSModules } from './lib/utils/inject-missing-css-modules';

/* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
export const getMarkdocCustomConfig = (): { config: any; components: any } => ({
  config: {
    nodes: {
      link,
      fence,
      heading,
    },
    tags: {
      youtube,
      embeddedCode,
    },
  },
  components: {
    CustomLink,
    Fence,
    Heading,
    YouTube,
    EmbeddedCode,
  },
});

export {
  generateIDfromTag,
  generateIDfromString,
  transformEmbeddedCodeFilePath,
  InjectMissingCSSModules,
  Fence,
  Heading,
};

export * from './lib/utils/reader-mode-workarounds';

export const parseMarkdown: (markdown: string) => Node = (markdown) =>
  parse(markdown);

export const renderMarkdown = (document: { content: string }): ReactNode => {
  const ast = parseMarkdown(document.content.toString());
  const configuration = getMarkdocCustomConfig();
  return renderers.react(transform(ast, configuration.config), React, {
    components: configuration.components,
  });
};
