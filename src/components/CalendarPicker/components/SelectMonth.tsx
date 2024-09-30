import {
  StyleSheet,
  Text,
  TextStyle,
  Touchable,
  TouchableHighlight,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {useColors} from '../../../config/useColors';

type SelectMonthProps = {
  monthName: string;
  isMonthSelected: boolean;
  onMonthPress: () => void;
};

const SelectMonth = ({
  monthName,
  isMonthSelected,
  onMonthPress,
}: SelectMonthProps) => {
  const {dark, light, primary, secondary} = useColors();
  const selectedMonthStyle: TextStyle = isMonthSelected
    ? {backgroundColor: primary, color: light}
    : {color: dark};
  return (
    <TouchableOpacity style={[styles.month]} onPress={() => onMonthPress()}>
      <Text style={[styles.defaultMonthNameStyle, selectedMonthStyle]}>
        {monthName}
      </Text>
    </TouchableOpacity>
  );
};

export default SelectMonth;

const styles = StyleSheet.create({
  month: {
    height: 38,
    marginHorizontal: 5,
  },
  defaultMonthNameStyle: {borderRadius: 10, padding: 10},
});
