import {StyleSheet, Text, TextStyle, View, TextProps} from 'react-native';
import React from 'react';

type ShowSelectedYearTextProps = {
  currentYear: number;
  style?: TextStyle;
} & TextProps;

const ShowSelectedYearText = ({
  currentYear,
  style = {},
  ...remainingProps
}: ShowSelectedYearTextProps) => {
  return (
    <Text {...remainingProps} style={[styles.textStyle, style]}>
      {currentYear}
    </Text>
  );
};

export default ShowSelectedYearText;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    fontWeight: '600',
  },
});
