import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {useColors} from '../../../config/useColors';

type dayContainerProps = {
  day: string;
  isSelected: boolean;
  isDisabled?: boolean;
  onDayPress: (day: string) => void;
};

const DayContainer = ({
  day,
  isSelected,
  isDisabled = false,
  onDayPress,
}: dayContainerProps) => {
  const {primary, light, lightGray, darkModeColor} = useColors();
  const WrapperComponent = isDisabled ? Pressable : TouchableOpacity;

  const dateStyle: ViewStyle =
    isSelected && !isDisabled ? {backgroundColor: primary} : {};
  const dateTextStyle: TextStyle = isSelected
    ? {color: light}
    : {color: darkModeColor};
  const disabledTextStyle: TextStyle = isDisabled ? {color: lightGray} : {};

  const handleDayPress = () => {
    if (!day || isDisabled) return;
    onDayPress(day);
  };

  return (
    <WrapperComponent
      onPress={handleDayPress}
      style={[styles.dateStyle, dateStyle]}>
      <Text style={[styles.dateTextStyle, dateTextStyle, disabledTextStyle]}>
        {day}
      </Text>
    </WrapperComponent>
  );
};

export default DayContainer;

const styles = StyleSheet.create({
  dateStyle: {
    textAlign: 'center',
    flexGrow: 1,
    flexBasis: 5,
    padding: 5,
    borderRadius: 15,
  },
  dateTextStyle: {textAlign: 'center'},
});
