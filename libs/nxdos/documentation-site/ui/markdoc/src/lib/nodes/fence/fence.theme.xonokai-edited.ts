const palette = {
  pink: 'var(--fence-theme--pink)',
  red: 'var(--fence-theme--red)',
  gray: 'var(--fence-theme--gray)',
  purple: 'var(--fence-theme--purple)',
  greenishYellow: 'var(--fence-theme--greenishYellow)',
  aqua: 'var(--fence-theme--aqua)',
  yellow: 'var(--fence-theme--yellow)',
  punctuation: 'var(--fence-theme--punctuation)',
};

export default {
  'code[class*="language-"]': {
    MozTabSize: '2',
    OTabSize: '2',
    tabSize: '2',
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
    whiteSpace: 'pre-wrap',
    wordWrap: 'normal',
    fontFamily: 'Noto Sans Mono, Menlo, Monaco, "Courier New", monospace',
    fontSize: '14px',
    color: palette.aqua,
    textShadow: 'none',
  },
  'pre[class*="language-"]': {
    MozTabSize: '2',
    OTabSize: '2',
    tabSize: '2',
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
    whiteSpace: 'pre-wrap',
    wordWrap: 'normal',
    fontFamily: 'Noto Sans Mono, Menlo, Monaco, "Courier New", monospace',
    fontSize: '14px',
    color: palette.aqua,
    textShadow: 'none',
    background: 'var(--theme-codefence-bg)',
    padding: '15px',
    borderRadius: '4px',
    border: '1px solid #e1e1e8',
    overflow: 'auto',
    position: 'relative',
  },
  'pre > code[class*="language-"]': {
    fontSize: '1em',
  },
  ':not(pre) > code[class*="language-"]': {
    background: '#2a2a2a',
    padding: '0.15em 0.2em 0.05em',
    borderRadius: '.3em',
    border: '0.13em solid #7a6652',
    boxShadow: '1px 1px 0.3em -0.1em #000 inset',
  },
  'pre[class*="language-"] code': {
    whiteSpace: 'pre',
    display: 'block',
  },
  namespace: {
    Opacity: '.7',
  },
  comment: {
    color: palette.gray,
  },
  prolog: {
    color: palette.gray,
  },
  doctype: {
    color: palette.gray,
  },
  cdata: {
    color: palette.gray,
  },
  operator: {
    color: palette.purple,
  },
  boolean: {
    color: palette.purple,
  },
  number: {
    color: palette.purple,
  },
  'attr-name': {
    color: palette.yellow,
  },
  string: {
    color: palette.yellow,
  },
  entity: {
    color: palette.yellow,
    cursor: 'help',
  },
  url: {
    color: palette.yellow,
  },
  '.language-css .token.string': {
    color: palette.yellow,
  },
  '.style .token.string': {
    color: palette.yellow,
  },
  selector: {
    color: palette.greenishYellow,
  },
  inserted: {
    color: palette.greenishYellow,
  },
  atrule: {
    color: palette.red,
  },
  'attr-value': {
    color: palette.red,
  },
  keyword: {
    color: palette.red,
  },
  important: {
    color: palette.red,
    fontWeight: 'bold',
  },
  deleted: {
    color: palette.red,
  },
  regex: {
    color: palette.aqua,
  },
  statement: {
    color: palette.aqua,
    fontWeight: 'bold',
  },
  placeholder: {
    color: '#fff',
  },
  variable: {
    color: palette.aqua,
  },
  bold: {
    fontWeight: 'bold',
  },
  punctuation: {
    color: palette.punctuation,
  },
  italic: {
    fontStyle: 'italic',
  },
  'code.language-markup': {
    color: '#f9f9f9',
  },
  'code.language-markup .token.tag': {
    color: '#ef3b7d',
  },
  'code.language-markup .token.attr-name': {
    color: '#a6e22d',
  },
  'code.language-markup .token.attr-value': {
    color: palette.yellow,
  },
  'code.language-markup .token.style': {
    color: '#76d9e6',
  },
  'code.language-markup .token.script': {
    color: '#76d9e6',
  },
  'code.language-markup .token.script .token.keyword': {
    color: '#76d9e6',
  },
  '.line-highlight.line-highlight': {
    padding: '0',
    background: 'rgba(255, 255, 255, 0.08)',
  },
  '.line-highlight.line-highlight:before': {
    padding: '0.2em 0.5em',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    color: 'black',
    height: '1em',
    lineHeight: '1em',
    boxShadow: '0 1px 1px rgba(255, 255, 255, 0.7)',
  },
  '.line-highlight.line-highlight[data-end]:after': {
    padding: '0.2em 0.5em',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    color: 'black',
    height: '1em',
    lineHeight: '1em',
    boxShadow: '0 1px 1px rgba(255, 255, 255, 0.7)',
  },
};
