import {StyleSheet} from 'react-native';
import {dark} from '../config/colors';

export const getDefaultContainerStyle = () => {
  return StyleSheet.create({container: {flex: 1, padding: 10}});
};

export const getDefaultFlexStyles = () => {
  const styles = StyleSheet.create({
    flexRowStyles: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    flexColStyles: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  return styles;
};

export const getTestBorderStyles = (
  borderWidth: number = 1,
  borderColor: string = dark,
) => {
  return {borderColor, borderWidth};
};
