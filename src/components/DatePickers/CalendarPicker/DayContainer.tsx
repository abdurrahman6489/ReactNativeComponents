import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
  View,
} from 'react-native';
import React from 'react';
import {useColors} from '../../../config/useColors';
import {getTestBorderStyles} from '../../../Utils/defaultStyles';
import {markedDateStyle} from '.';

type dayContainerProps = {
  day: string;
  isSelected: boolean;
  isDisabled?: boolean;
  getMarkedStyle: (day: string) => markedDateStyle;
  onDayPress: (day: string) => void;
};

const DayContainer = ({
  day,
  isSelected,
  isDisabled = false,
  getMarkedStyle,
  onDayPress,
}: dayContainerProps) => {
  const WrapperComponent = isDisabled ? Pressable : TouchableOpacity;
  const {primary, light, lightGray, darkModeColor} = useColors();

  const markedStyle = getMarkedStyle(day);
  const {isMarked, markedColor, selectedDateMarkedColor} = markedStyle;

  const dateStyle: ViewStyle =
    isSelected && !isDisabled ? {backgroundColor: primary} : {};

  const dateTextStyle: TextStyle = {color: isSelected ? light : darkModeColor};

  const disabledTextStyle: TextStyle = isDisabled ? {color: lightGray} : {};

  const handleDayPress = () => {
    if (!day || isDisabled) return;
    onDayPress(day);
  };

  const dotStyle: ViewStyle = {
    backgroundColor: isSelected ? selectedDateMarkedColor : markedColor,
  };

  return (
    <WrapperComponent
      onPress={handleDayPress}
      style={[styles.dateStyle, dateStyle]}>
      <Text style={[styles.dateTextStyle, dateTextStyle, disabledTextStyle]}>
        {day}
      </Text>
      {isMarked ? <View style={[styles.dotStyle, dotStyle]}></View> : null}
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
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    // ...getTestBorderStyles(1, 'black'),
  },
  dateTextStyle: {textAlign: 'center'},
  dotStyle: {
    position: 'absolute',
    bottom: 1,
    width: 3,
    height: 3,
    borderRadius: 20,
  },
});
