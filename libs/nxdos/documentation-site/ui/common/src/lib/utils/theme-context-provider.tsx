import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

import {
  SELECTED_THEMES,
  COLOR_THEMES,
  getColorThemeStyles,
} from './color-theme';

const ThemeContext = createContext<ThemeState>({} as ThemeState);

export interface ThemeState {
  bannerAnimationState: {
    isRevealed: boolean;
    setStatus: Dispatch<SetStateAction<boolean>>;
  };
  selectedThemes: {
    defaultTheme: [number, number, number];
  };
  isReplicaToggled: boolean;
  changeTheme: () => void;
  getColorThemeStyles: (
    [r, g, b]: [number, number, number],
    override?: boolean
  ) => string;
}

const getRandomTheme = (themes: {
  [key: string]: [number, number, number];
}) => {
  const keys = Object.keys(themes);
  const theme_name = keys[(keys.length * Math.random()) << 0];
  return themes[theme_name];
};

export const ThemeContextProvider = ({ children }: PropsWithChildren) => {
  const [bannerAnimationRevealed, setBannerAnimationStatus] = useState(false);
  const [animationReplicaToggled, toggleAnimationReplica] = useState(false);
  const [selectedThemes, updateThemes] = useState(SELECTED_THEMES);

  const randomizeTheme = () => {
    let randomTheme = getRandomTheme(COLOR_THEMES);
    /* istanbul ignore next */
    while (randomTheme === selectedThemes.defaultTheme) {
      randomTheme = getRandomTheme(COLOR_THEMES);
    }

    updateThemes({
      ...selectedThemes,
      defaultTheme: randomTheme,
    });

    toggleAnimationReplica(!animationReplicaToggled);
  };

  // Define any functions or values you want to provide
  const value = {
    bannerAnimationState: {
      isRevealed: bannerAnimationRevealed,
      setStatus: setBannerAnimationStatus,
    },
    isReplicaToggled: animationReplicaToggled,
    selectedThemes: selectedThemes,
    changeTheme: randomizeTheme,
    getColorThemeStyles: getColorThemeStyles,
  };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useThemeContext = (): ThemeState => useContext(ThemeContext);
