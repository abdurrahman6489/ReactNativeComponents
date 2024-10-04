import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useColors} from '../../../config/useColors';

type YearNavigatorProps = {
  currentYear: number;
  onYearPress: () => void;
};

const YearNavigator = ({currentYear, onYearPress}: YearNavigatorProps) => {
  const {primary, light} = useColors();
  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor: primary}]}
      onPress={onYearPress}>
      <Text style={[styles.textStyle, {color: light}]}>{currentYear}</Text>
    </TouchableOpacity>
  );
};

export default YearNavigator;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  textStyle: {
    fontSize: 30,
    fontWeight: '600',
  },
});
