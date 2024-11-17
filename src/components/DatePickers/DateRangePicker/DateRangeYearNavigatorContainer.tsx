import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {useColors} from '../../../config/useColors';

type DateRangeYearNavigatorContainerProps = {
  children: ReactNode;
  style?: ViewStyle;
  onYearPress: () => void;
} & ViewStyle;

const DateRangeYearNavigatorContainer = ({
  onYearPress,
  style = {},
  children,
}: DateRangeYearNavigatorContainerProps) => {
  const {primary} = useColors();
  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor: primary}, style]}
      onPress={onYearPress}>
      {children}
    </TouchableOpacity>
  );
};

export default DateRangeYearNavigatorContainer;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'space-between',

    // ...getTestBorderStyles(),
  },
});
