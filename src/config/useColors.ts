import {useTheme} from 'react-native-paper';
import {dark, light, lightGray} from './colors';
export const useColors = () => {
  const theme = useTheme();
  return {
    primary: theme.colors.primary,
    dark,
    light,
    lightGray,
  };
};
