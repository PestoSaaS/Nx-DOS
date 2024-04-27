import React, { CSSProperties, useMemo } from 'react';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { default as xonokai } from './fence.theme.xonokai-edited';
import { ReactComponent as CopyIcon } from '../../../assets/icons/copy-icon.svg';
import styles from './fence.module.css';

/* istanbul ignore next */
function resolveLanguage(lang: string | undefined) {
  switch (lang) {
    case 'ts':
      return 'typescript';
    case 'tsx':
      return 'typescript';
    case 'js':
      return 'javascript';
    case 'jsx':
      return 'javascript';
    default:
      return lang;
  }
}

const highlightLine = (
  lineNumber: number,
  markLines: number[],
  color?: string
): React.HTMLProps<HTMLElement> => {
  // only works when showLineNumbers and wrapLines are both enabled
  let props = {};
  if (markLines.includes(lineNumber)) {
    const style = { '--checkers-pattern-color': color };
    props = { style, classID: 'highlightedLine' };
  }
  return props;
};

export function Fence({
  children,
  language,
}: {
  children: string;
  language: string;
}) {
  const highlightedLinesIndex = language ? language.indexOf('{') : -1;
  const parsedLanguage =
    highlightedLinesIndex !== -1
      ? language.substring(0, highlightedLinesIndex)
      : language;
  const linesToHighlight_string = !language
    ? ''
    : language.substring(highlightedLinesIndex + 1, language.indexOf('}'));
  const ranges = linesToHighlight_string.split(',').filter((val) => val);
  const linesToHighlight_numeric: number[] = [];
  for (const range of ranges) {
    let [start, end] = range.split(/[-:]+/);
    if (!start || !end) {
      start = range;
      end = range;
    }
    for (let i = +start; i <= +end; i++) {
      linesToHighlight_numeric.push(i);
    }
  }

  const highlightedCode = useMemo(
    () => (
      <SyntaxHighlighter
        showLineNumbers={
          !['bash', 'text', 'treeview'].includes(
            parsedLanguage ? parsedLanguage : ''
          )
        }
        language={parsedLanguage ? resolveLanguage(parsedLanguage) : ''}
        style={xonokai as { [key: string]: CSSProperties }}
        children={children}
        wrapLines={true}
        lineProps={(line: number) => {
          return highlightLine(line, linesToHighlight_numeric);
        }}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [children]
  );

  return (
    <div
      className={
        styles['code-block'] +
        ' code-block group relative will-change-transform transform-gpu ' +
        (!['bash', 'text', 'treeview'].includes(parsedLanguage)
          ? ' ' + styles['code-block--withLineNumbers']
          : '')
      }
      aria-hidden="false"
    >
      {highlightedCode}
      <CopyIcon
        className={'copyIcon'}
        data-testid={'copyToClipboardButton'}
        aria-hidden="true"
      />
    </div>
  );
}
