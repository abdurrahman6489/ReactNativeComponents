import {useTheme} from 'react-native-paper';
import {useIsDarkMode} from '../Hooks/useIsDarkMode';
import {dark, light, lightGray, lightGrayInDark} from './colors';
export const useColors = () => {
  const theme = useTheme();
  const isDark = useIsDarkMode();

  return {
    primary: theme.colors.primary,
    secondary: theme.colors.secondary,
    light: light,
    dark: dark,
    darkModeColor: isDark ? light : dark,
    lightModeColor: isDark ? dark : light,
    lightGray: isDark ? lightGrayInDark : lightGray,
  };
};
