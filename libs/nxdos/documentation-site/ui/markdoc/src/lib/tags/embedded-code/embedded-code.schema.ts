import { Schema } from '@markdoc/markdoc';

export const embeddedCode: Schema = {
  render: 'EmbeddedCode',
  attributes: {
    filePath: {
      type: 'String',
      required: true,
    },
    componentType: {
      type: 'String',
      required: true,
      default: 'EmbeddedCode',
    },
    language: {
      type: 'String',
    },
  },
};
