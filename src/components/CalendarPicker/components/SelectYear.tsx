import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {useColors} from '../../../config/useColors';

type YearProps = {
  year: number;
  isSelectedYear: boolean;
  onYearPress: (year: number) => void;
};

const SelectYear = ({year, onYearPress, isSelectedYear}: YearProps) => {
  const {primary, light, dark} = useColors();
  const containerStyle: ViewStyle = isSelectedYear
    ? {backgroundColor: primary}
    : {backgroundColor: light};
  const textStyle: TextStyle = isSelectedYear
    ? {color: light, fontSize: 30, fontWeight: '600'}
    : {color: dark, fontSize: 25, fontWeight: '300'};
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={() => onYearPress(year)}>
      <Text style={[styles.textStyle, textStyle]}>{year}</Text>
    </TouchableOpacity>
  );
};

export default SelectYear;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  textStyle: {
    textAlign: 'center',
  },
});
