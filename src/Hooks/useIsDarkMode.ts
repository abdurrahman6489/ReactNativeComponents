import {ColorSchemeName, useColorScheme} from 'react-native';
import {appModeObj} from '../constants';

export const useIsDarkMode = () => {
  const colorScheme: ColorSchemeName = useColorScheme();
  return colorScheme === appModeObj.dark;
};
