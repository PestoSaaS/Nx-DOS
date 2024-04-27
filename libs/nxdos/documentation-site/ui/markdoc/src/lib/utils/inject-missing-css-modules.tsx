import fenceStyles from '../nodes/fence/fence.module.css';
import headingStyles from '../nodes/heading/heading.module.css';
import embeddedCodeStyles from '../tags/embedded-code/embedded-code.module.css';

export function InjectMissingCSSModules(): JSX.Element {
  /* The following invisible component is a hack to fool Next.js into including the css modules for related 
     components that are missing from Production build during server side rendering, please DO NOT REMOVE */
  return (
    <div
      className={
        'hidden ' +
        fenceStyles['code-block'] +
        ' ' +
        headingStyles['headingFrame'] +
        ' ' +
        embeddedCodeStyles['embedded-code-directory-wrapper']
      }
    />
  );
}
