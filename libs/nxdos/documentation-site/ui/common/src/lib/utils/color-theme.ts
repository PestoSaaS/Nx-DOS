export const getColorThemeStyles = (
  [r, g, b]: [number, number, number],
  override = false
): string => {
  return `:root {
 --theme-red-hue--input: ${r}${override ? '!important' : ''};
 --theme-green-hue--input: ${g}${override ? '!important' : ''};
 --theme-blue-hue--input: ${b}${override ? '!important' : ''};
  }`;
};

export const COLOR_THEMES: { [key: string]: [number, number, number] } = {
  /* ############################################ */
  /* #### use hue values ranging [-100,+200] #### */
  /* ############################################ */

  /* uncomment the RGB variables for your selected theme */

  /* start of color-theme config variables */
  /* -▼-▼-▼-▼-▼-▼-▼-▼-▼-▼-▼-▼-▼-▼-▼-▼-▼-▼-  */

  /* 
  RED DOMINANT THEMES
  */
  'red alert': [5, -42, -34],
  'crimson brown': [42, 23.85, 18.75],
  'deep purple': [25, 2, 42.2],
  'pastel pink': [125, 102, 142.2],
  'candy pink': [162, 102, 142.2],

  /* 
  GREEN DOMINANT THEMES
  */
  'leaf green': [65.75, 101.085, 80],
  'army green': [6.575, 10.1085, 8],
  'khaki green': [14.4, 29.85, 26.685],

  /* 
  BLUE DOMINANT THEMES
  */
  'sky blue': [35.14875, 43.08, 100.0275],
  'violet blue': [32.5, 11, 150.055],
  'aqua blue': [25, 132, 200],
  'cement blue': [25, 32, 43.25],
  'night blue': [-2, 2, 7],
  'indigo blue': [2, 0, 12.05],
  'uv blacklight': [0, -43, 41],
  'uv neon': [12.2725, -12, 72],
  'uv lavender': [34.5725, 6, 128.25925],
  'cocktail lavender': [38.125, 10, 145.6],
  /* 
  BENCHED THEMES, so randomization don't skew too much blue 
  */
  // 'light violet blue': [82, 20, 322.28125],
  // 'dark violet blue': [16.5, 4, 77.95],
  // 'twilight blue': [37.49125, 41.54, 132.5425],

  /* 
  GRAY DOMINANT THEMES 
  */
  'silver gray': [105, 112, 141.825],
  'pastel gray': [216, 217.575, 217.575],
  'carbon gray': [22, 20, 29.05],
  'dark charcoal': [1.13, 1.02, 3.345],
  'neutral gray': [10.28, 10, 10],

  /* -▲-▲-▲-▲-▲-▲-▲-▲-▲-▲-▲-▲-▲-▲-▲-▲-▲- */
  /* end of color-theme config variables */
};

export const SELECTED_THEMES = {
  defaultTheme: COLOR_THEMES['sky blue'],
};
