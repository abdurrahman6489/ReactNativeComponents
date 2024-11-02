import {StyleSheet} from 'react-native';
import React from 'react';
import WeekContainer from '../DateCommonComponents/WeekContainer';
import DayContainer from './DayContainer';
import {markedDateStyle} from './index';

type RenderCurrentMonthDatesProps = {
  monthlyArray: string[][];
  getCurrentDate: (day: string) => Date;
  getIsSelectedDate: (date: string) => boolean;
  handleDatePress: (day: string) => void;
  checkIsDateDisabled?: (day: string) => boolean;
  renderCustomDayElement?: ((date: string) => React.JSX.Element) | null;
  getMarkedStyle?: (date: Date) => markedDateStyle;
};

const RenderCurrentMonthDates = ({
  monthlyArray,
  getIsSelectedDate,
  handleDatePress,
  checkIsDateDisabled = (day: string) => false,
  getMarkedStyle = (date: Date) => ({
    isMarked: false,
    markedColor: '',
    selectedDateMarkedColor: '',
  }),
  getCurrentDate,
  renderCustomDayElement = null,
}: RenderCurrentMonthDatesProps) => {
  const handleMarkedStyle = (day: string) => {
    const date = getCurrentDate(day);
    return getMarkedStyle(date);
  };
  return monthlyArray.map((weeklyArray, weekIndex) => {
    return (
      <WeekContainer key={`${weekIndex}-weekList`}>
        {weeklyArray.map((day, index) => {
          return !renderCustomDayElement ? (
            <DayContainer
              key={`${day}/${index}`}
              day={day}
              isDisabled={checkIsDateDisabled(day)}
              isSelected={getIsSelectedDate(day)}
              onDayPress={handleDatePress}
              getMarkedStyle={handleMarkedStyle}
            />
          ) : (
            renderCustomDayElement(day)
          );
        })}
      </WeekContainer>
    );
  });
};

export default RenderCurrentMonthDates;

const styles = StyleSheet.create({});
