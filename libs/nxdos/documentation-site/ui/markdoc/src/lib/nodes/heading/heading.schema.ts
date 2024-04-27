import { Schema, Tag } from '@markdoc/markdoc';
import { generateIDfromTag } from '../../utils/generate-section-id';

export const heading: Schema = {
  render: 'Heading',
  children: ['inline'],
  attributes: {
    id: { type: 'String' },
    level: { type: 'Number', required: true, default: 1 },
    className: { type: 'String' },
    componentType: {
      type: 'String',
      required: true,
      default: 'Heading',
    },
  },
  transform(node, config) {
    const attributes = node.transformAttributes(config);
    const children = node.transformChildren(config);
    const id = generateIDfromTag(children, attributes);

    return new Tag(this.render, { ...attributes, id }, children);
  },
};
