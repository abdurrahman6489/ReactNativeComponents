import {StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {useColors} from '../../../config/useColors';
import {getTestBorderStyles} from '../../../Utils/defaultStyles';
import ShowSelectedYearText from './ShowSelectedYearText';

type YearNavigatorProps = {
  onYearPress: () => void;
  style?: ViewStyle;
  children: ReactNode;
} & ViewStyle;

const YearNavigator = ({
  onYearPress,
  style = {},
  children,
}: YearNavigatorProps) => {
  const {primary} = useColors();
  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor: primary}, style]}
      onPress={onYearPress}>
      {children}
    </TouchableOpacity>
  );
};

export default YearNavigator;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexGrow: 1,
    // ...getTestBorderStyles(),
  },
});
