export const handleCodeFenceCopy = (event: Event) => {
  const parentClone = (
    event.target as HTMLElement
  ).parentElement?.children[0].cloneNode(true);
  (parentClone as HTMLElement)
    .querySelectorAll('.linenumber')
    .forEach((element) => {
      element.remove();
    });

  copyToClipboard(parentClone ? (parentClone.textContent as string) : '');

  const target = event.target as EventTarget as HTMLElement;
  if (target.dataset['timer']) {
    /* istanbul ignore next */
    clearTimeout(JSON.parse(target.dataset['timer']));
  }

  const timeout: NodeJS.Timeout = setTimeout(
    /* istanbul ignore next */
    () => {
      target.classList.remove('copyIcon--copied');
      target.removeAttribute('data-timer');
    },
    3000
  );
  target.dataset['timer'] = JSON.stringify(timeout);
  target.classList.add('copyIcon--copied');
};

export const handleAnchorLinkCopy = (event: Event) => {
  event.preventDefault();
  const anchorTarget = (
    event.target as HTMLElement
  ).parentElement?.parentElement?.parentElement?.parentElement?.cloneNode(true);
  const anchorLink = (anchorTarget as HTMLElement).getAttribute(
    'data-anchorlink'
  );
  const animatedAnchor = (event.target as HTMLElement).parentElement
    ?.children[1];
  (animatedAnchor as HTMLElement).classList.add(
    'anchorLinkClipboardIcon--clicked'
  );
  /* istanbul ignore next */
  setTimeout(() => {
    (animatedAnchor as HTMLElement).classList.add(
      'anchorLinkClipboardIcon--fading'
    );
    (animatedAnchor as HTMLElement).classList.remove(
      'anchorLinkClipboardIcon--clicked'
    );
  }, 750);
  copyToClipboard(
    window.location.origin +
      window.location.pathname +
      (anchorLink ? '#' + anchorLink : '')
  );
};

// return a promise
const copyToClipboard = (textToCopy: string) => {
  // navigator clipboard api needs a secure context (https)
  if (navigator.clipboard && window.isSecureContext) {
    // navigator clipboard api method'
    /* istanbul ignore next */
    return navigator.clipboard.writeText(textToCopy);
  } else {
    // text area method
    const textArea = document.createElement('textarea');
    textArea.value = textToCopy;
    // make the textarea out of viewport
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    return new Promise<void>((res, rej) => {
      document.execCommand('copy') ? res() : rej();
      textArea.remove();
    });
  }
};
