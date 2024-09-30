import {StyleSheet, Text, TextStyle, ViewStyle} from 'react-native';
import React from 'react';
import {useColors} from '../../config/useColors';

type dayContainerProps = {
  day: string;
  isSelected: boolean;
  onDayPress: (day: string) => void;
};

const DayContainer = ({day, isSelected, onDayPress}: dayContainerProps) => {
  const {primary, dark, light} = useColors();
  const handleDayPress = () => {
    if (!day) return;
    onDayPress(day);
  };
  const dateStyle: TextStyle = isSelected
    ? {backgroundColor: primary, color: light}
    : {color: dark};
  return (
    <Text style={[styles.dayStyle, dateStyle]} onPress={handleDayPress}>
      {day}
    </Text>
  );
};

export default DayContainer;

const styles = StyleSheet.create({
  dayStyle: {
    textAlign: 'center',
    flexGrow: 1,
    flexBasis: 5,
    padding: 5,
    borderRadius: 15,
    // borderColor: 'black',
    // borderWidth: 1,
  },
});
