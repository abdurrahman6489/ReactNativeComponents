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
import {isSameDate} from '../Utils/DateUtilFunctions';

type DateRangeDayContainerProps = {
  day: string;
  isInRange: boolean;
  isStartOfRange: boolean;
  isEndOfRange: boolean;
  isDisabled?: boolean;
  onDayPress: (day: string) => void;
};

const DateRangeDayContainer = ({
  day,
  isStartOfRange,
  isInRange,
  isEndOfRange,
  isDisabled = false,
  onDayPress,
}: DateRangeDayContainerProps) => {
  const WrapperComponent = isDisabled ? Pressable : TouchableOpacity;
  const {primary, light, lightGray, darkModeColor} = useColors();

  const isSelectedDay = isStartOfRange || isInRange || isEndOfRange;
  const selectedStyle: ViewStyle = {backgroundColor: primary};

  const dateStyle: ViewStyle = isDisabled
    ? {}
    : isStartOfRange
    ? {...selectedStyle, ...styles.startRangeStyle}
    : isEndOfRange
    ? {...selectedStyle, ...styles.endRangeStyle}
    : isInRange
    ? {...selectedStyle}
    : {};

  const dateTextStyle: TextStyle = {
    color: isSelectedDay ? light : darkModeColor,
  };

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

export default DateRangeDayContainer;

const styles = StyleSheet.create({
  dateStyle: {
    textAlign: 'center',
    flexGrow: 1,
    flexBasis: 5,
    padding: 5,
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    // ...getTestBorderStyles(1, 'black'),
  },
  dateTextStyle: {textAlign: 'center'},
  startRangeStyle: {borderTopLeftRadius: 15, borderBottomLeftRadius: 15},
  endRangeStyle: {borderTopRightRadius: 15, borderBottomRightRadius: 15},
});
