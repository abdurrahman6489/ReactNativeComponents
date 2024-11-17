import {StyleSheet, Text, TextStyle, View, TextProps} from 'react-native';
import React from 'react';

type DateRangeYearNavigatorTextProps = {
  currentYear: number;
  style?: TextStyle;
} & TextProps;

const DateRangeYearNavigatorText = ({
  currentYear,
  style = {},
  ...remainingProps
}: DateRangeYearNavigatorTextProps) => {
  return (
    <Text {...remainingProps} style={[styles.textStyle, style]}>
      {currentYear}
    </Text>
  );
};

export default DateRangeYearNavigatorText;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    fontWeight: '600',
  },
});
