import { COLOR_THEMES, SELECTED_THEMES } from './color-theme';

export const updateSiteIcons = (
  alternativeTheme?: (typeof COLOR_THEMES)[string]
) => {
  if (typeof window !== 'undefined') {
    const faviconLinks: NodeListOf<HTMLLinkElement> =
      document.querySelectorAll("link[rel~='icon']");
    const appleTouchIconLinks: NodeListOf<HTMLLinkElement> =
      document.querySelectorAll("link[rel~='apple-touch-icon']");

    /* istanbul ignore next */
    if (faviconLinks.length === 0) {
      const faviconLink = document.createElement('link');
      faviconLink.setAttribute('rel', 'shortcut icon');
      faviconLink.setAttribute('type', 'image/x-icon');
      document.head.appendChild(faviconLink);
      modifyIconLink(faviconLink, alternativeTheme);
    } else {
      faviconLinks.forEach((link) => modifyIconLink(link, alternativeTheme));
    }

    if (appleTouchIconLinks.length === 0) {
      const appleTouchIconLink = document.createElement('link');
      appleTouchIconLink.setAttribute('rel', 'apple-touch-icon');
      document.head.appendChild(appleTouchIconLink);
      modifyIconLink(appleTouchIconLink, alternativeTheme);
    } else {
      appleTouchIconLinks.forEach((link) =>
        modifyIconLink(link, alternativeTheme)
      );
    }
  }
};

const modifyIconLink = (
  iconLink: HTMLLinkElement,
  alternativeTheme?: (typeof COLOR_THEMES)[string]
) => {
  let iconWidth: number, iconHeight: number;
  const iconSizeInString = iconLink['sizes']?.value;
  /* istanbul ignore next */
  if (iconSizeInString) {
    iconWidth = Number(
      iconSizeInString.substring(0, (iconSizeInString.length - 1) / 2)
    );
    iconHeight = Number(
      iconSizeInString.substring((iconSizeInString.length + 1) / 2)
    );
  } else {
    [iconWidth, iconHeight] = [48, 48];
  }

  let iconUrl;
  /* istanbul ignore next */
  if (iconLink.rel === 'apple-touch-icon') {
    iconUrl = window.location.origin + '/images/apple-touch-icon.png';
  } else {
    if (iconHeight === 16) {
      iconUrl = window.location.origin + '/images/favicon-16x16.png';
    } else if (iconHeight === 32) {
      iconUrl = window.location.origin + '/images/favicon-32x32.png';
    } else {
      iconUrl = window.location.origin + '/favicon.ico';
    }
  }

  /* istanbul ignore next */
  function onImageLoaded(alternativeTheme?: (typeof COLOR_THEMES)[string]) {
    const [dr, dg, db] = alternativeTheme
      ? alternativeTheme
      : SELECTED_THEMES.defaultTheme;
    const THEME_BRIGHTNESS_DELTA_TOTAL = dr + dg + db + 0.5;
    const THEME_HUE_ROTATION_TOTAL =
      String(
        ((180 *
          ((dr - dg - db) * (dr - dg - db) +
            (dg - db - dr) * (dg - db - dr) +
            (db - dr - dg) * (db - dr - dg))) /
          THEME_BRIGHTNESS_DELTA_TOTAL) %
          360
      ) + 'deg';

    const canvas = document.createElement('canvas');
    canvas.width = iconWidth;
    canvas.height = iconHeight;
    const context = canvas.getContext('2d');
    if (context) {
      context.filter = `hue-rotate(${THEME_HUE_ROTATION_TOTAL})`;
      context.drawImage(img, 0, 0);
      iconLink.href = canvas.toDataURL();
    }
  }

  const img = document.createElement('img');
  img.addEventListener('load', () => onImageLoaded(alternativeTheme));
  img.src = iconUrl;
};
