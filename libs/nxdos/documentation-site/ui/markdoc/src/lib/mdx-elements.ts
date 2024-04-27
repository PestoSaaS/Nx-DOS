import dynamic, { DynamicOptions, Loader } from 'next/dynamic';
import { CustomLink } from './nodes/link/link.component';

export const mdxElements = {
  Youtube: dynamic(
    (() => import('./tags/youtube/youtube.component')) as
      | DynamicOptions
      | Loader
  ),
  a: CustomLink,
};
