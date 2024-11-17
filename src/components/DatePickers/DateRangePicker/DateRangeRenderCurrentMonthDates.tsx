import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WeekContainer from '../DateCommonComponents/WeekContainer';
import DateRangeDayContainer from './DateRangeDayContainer';

type DateRangeRenderCurrentMonthDatesProps = {
  monthlyArray: string[][];
  getCurrentDate: (day: string) => Date;
  getIsInDateRange: (date: string) => boolean;
  getIsStartOfRange: (date: string) => boolean;
  getIsEndOFRange: (date: string) => boolean;
  handleDatePress: (day: string) => void;
  checkIsDateDisabled?: (day: string) => boolean;
  renderCustomDayElement?: ((date: string) => React.JSX.Element) | null;
};

const DateRangeRenderCurrentMonthDates = ({
  monthlyArray,
  handleDatePress,
  getCurrentDate,
  getIsEndOFRange,
  getIsInDateRange,
  getIsStartOfRange,
  checkIsDateDisabled = (day: string) => false,
  renderCustomDayElement = null,
}: DateRangeRenderCurrentMonthDatesProps) => {
  return monthlyArray.map((weeklyArray, weekIndex) => {
    return (
      <WeekContainer key={`${weekIndex}-weekList`}>
        {weeklyArray.map((day, index) => {
          return !renderCustomDayElement ? (
            <DateRangeDayContainer
              key={`${day}/${index}`}
              day={day}
              isDisabled={checkIsDateDisabled(day)}
              onDayPress={handleDatePress}
              isEndOfRange={getIsEndOFRange(day)}
              isInRange={getIsInDateRange(day)}
              isStartOfRange={getIsStartOfRange(day)}
            />
          ) : (
            renderCustomDayElement(day)
          );
        })}
      </WeekContainer>
    );
  });
};

export default DateRangeRenderCurrentMonthDates;

const styles = StyleSheet.create({});
