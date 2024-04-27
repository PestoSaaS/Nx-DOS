import { Schema } from '@markdoc/markdoc';

export const youtube: Schema = {
  render: 'YouTube',
  attributes: {
    video_id: {
      type: 'String',
      required: true,
    },
    title: {
      type: 'String',
      required: true,
    },
    width: {
      type: 'String',
      default: '100%',
    },
  },
};
