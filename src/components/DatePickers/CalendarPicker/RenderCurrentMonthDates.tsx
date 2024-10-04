import {StyleSheet} from 'react-native';
import React from 'react';
import WeekContainer from '../DateCommonComponents/WeekContainer';
import DayContainer from './DayContainer';

type RenderCurrentMonthDatesProps = {
  monthlyArray: string[][];
  getIsSelectedDate: (date: string) => boolean;
  handleDatePress: (day: string) => void;
  checkIsDateDisabled?: (day: string) => boolean;
  renderCustomDayElement?: ((date: string) => React.JSX.Element) | null;
};

const RenderCurrentMonthDates = ({
  monthlyArray,
  getIsSelectedDate,
  handleDatePress,
  checkIsDateDisabled = (day: string) => false,
  renderCustomDayElement = null,
}: RenderCurrentMonthDatesProps) => {
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
