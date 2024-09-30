import {View, Text, Animated, Easing} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {
  createYearList,
  DEFAULT_ENDING_YEAR,
  DEFAULT_STARTING_YEAR,
  findTheFirstDayOfTheWeekArray,
  findTheIndexOfDayOfTheMonth,
  findTheLastDateOfTheMonth,
  getTheCalendarArray,
  INITIAL_YEARS_COUNT,
} from './utilFunctions';
import {daysArray, monthsArray} from './constants';
import MonthsList from './MonthsList';
import {useVisible} from '../../Hooks/useVisible';
import MonthNavigator from './MonthNavigator';
import DaysList from './DaysList';
import WeekContainer from './WeekContainer';
import DayContainer from './DayContainer';
import {isSameDate, printInReadableFormat} from '../../Utils/utilFunctions';
import YearNavigator from './YearNavigator';
import YearList from './YearList';
import DefaultFooter, {DefaultFooterProps} from './DefaultFooter';

type AppCalendarPickerProps = {
  date: Date;
  initialDate?: Date;
  renderCustomFooter?:
    | null
    | ((props: DefaultFooterProps) => React.JSX.Element);
  onSelectDate: (date: Date) => void;
  onCancel: () => void;
  onDatePress?: (date: Date) => void;
  onMonthPress?: (date: Date) => void;
  onYearPress?: (date: Date) => void;
  isFooterRequired?: boolean;
};

const AppCalendarPicker = ({
  initialDate = new Date(),
  date,
  renderCustomFooter = null,
  onSelectDate,
  onCancel,
  onDatePress = (date: Date) => {},
  onMonthPress = (date: Date) => {},
  onYearPress = (date: Date) => {},
  isFooterRequired = true,
}: AppCalendarPickerProps) => {
  const [initialDateToRender, setInitialDateToRender] = useState(
    () => initialDate,
  );
  const [yearBoundaries, setYearBoundaries] = useState({
    starting: DEFAULT_STARTING_YEAR,
    ending: DEFAULT_ENDING_YEAR,
  });
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const translateXAnim = useRef(new Animated.Value(0)).current;
  const monthListVisibility = useVisible();
  const yearListVisibility = useVisible();
  const dayInInitialDate = initialDateToRender.getDate();
  const monthInInitialDate = initialDateToRender.getMonth();
  const yearInInitialDate = initialDateToRender.getFullYear();

  const yearList = useMemo(() => {
    return createYearList(yearBoundaries.ending, yearBoundaries.starting);
  }, [yearBoundaries]);

  const generateMonthlyCalendar = () => {
    const firstDate = 1;
    const firstDateIndex = findTheIndexOfDayOfTheMonth(
      yearInInitialDate,
      monthInInitialDate,
      firstDate,
    );
    const lastDate = findTheLastDateOfTheMonth(
      yearInInitialDate,
      monthInInitialDate,
    );
    const firstDayOfTheWeekArray = findTheFirstDayOfTheWeekArray(
      yearInInitialDate,
      monthInInitialDate,
    );
    return getTheCalendarArray(
      firstDateIndex,
      lastDate,
      firstDayOfTheWeekArray,
    );
  };
  const monthlyArray = useMemo(
    () => generateMonthlyCalendar(),
    [yearInInitialDate, monthInInitialDate],
  );

  const getMonthAnimationFn = (callback: () => void, value: number) => {
    const animateFn = () => {
      Animated.timing(translateXAnim, {
        toValue: value,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start(() => {
        callback();
      });

      translateXAnim.setValue(-value);

      Animated.timing(translateXAnim, {
        toValue: 0,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    };
    return animateFn;
  };

  const handleGoToNextMonths = (callback: () => void) => {
    const animateFn = getMonthAnimationFn(callback, -400);
    animateFn();
  };

  const goToNextMonth = () => {
    const newDate =
      monthInInitialDate === 11
        ? new Date(yearInInitialDate + 1, 0, 1)
        : new Date(yearInInitialDate, monthInInitialDate + 1, 1);
    setInitialDateToRender(newDate);
    onMonthPress(newDate);
  };

  const handleGoToPreviousMonths = (callback: () => void) => {
    const animateFn = getMonthAnimationFn(callback, 400);
    animateFn();
  };

  const goToPreviousMonth = () => {
    const newDate =
      monthInInitialDate === 0
        ? new Date(yearInInitialDate - 1, 11, 1)
        : new Date(yearInInitialDate, monthInInitialDate - 1, 1);
    setInitialDateToRender(newDate);
    onMonthPress(newDate);
  };

  const handleOnMonthPress = (monthIndex: number) => {
    const callbackFn = () => {
      const newDate = new Date(yearInInitialDate, monthIndex, 1);
      setInitialDateToRender(newDate);
      onMonthPress(newDate);
    };
    const shouldGoToNextMonth = monthIndex > monthInInitialDate;
    const shouldGoToPrevMonth = monthIndex < monthInInitialDate;
    const callbackFnToCall = shouldGoToNextMonth
      ? () => handleGoToNextMonths(callbackFn)
      : shouldGoToPrevMonth
      ? () => handleGoToPreviousMonths(callbackFn)
      : () => callbackFn();

    callbackFnToCall();
  };

  const handleDatePress = (day: string) => {
    if (!day) return;
    const newDate = new Date(
      yearInInitialDate,
      monthInInitialDate,
      Number(day),
    );
    setInitialDateToRender(newDate);
    onDatePress(newDate);
  };

  const handleSelectYear = (year: number) => {
    if (!year) return;
    const newDate = new Date(year, monthInInitialDate, dayInInitialDate);
    setInitialDateToRender(newDate);
    onYearPress(newDate);
    yearListVisibility.toggle();
  };

  const handleSelectDate = () => {
    const newDate = new Date(
      yearInInitialDate,
      monthInInitialDate,
      dayInInitialDate,
    );
    onSelectDate(newDate);
  };

  const handleSwipe = (event: any) => {
    const {translationX} = event.nativeEvent;
    if (translationX > 50) {
      handleGoToPreviousMonths(goToPreviousMonth);
    } else if (translationX <= -50) {
      handleGoToNextMonths(goToNextMonth);
    }
  };

  useEffect(() => {
    if (monthListVisibility.isVisible) {
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [monthListVisibility.isVisible]);

  return yearListVisibility.isVisible ? (
    <View style={{width: '100%', height: '90%'}}>
      <View style={{paddingHorizontal: 5, marginVertical: 10}}>
        <Text style={{fontSize: 20, fontWeight: '300'}}>Select Year</Text>
      </View>
      <YearList
        yearList={yearList}
        selectedYear={yearInInitialDate}
        startingYear={yearBoundaries.starting}
        endingYear={yearBoundaries.ending}
        initialYearsToRender={INITIAL_YEARS_COUNT}
        onSelectYear={handleSelectYear}
      />
    </View>
  ) : (
    <>
      <YearNavigator
        currentYear={yearInInitialDate}
        onYearPress={yearListVisibility.toggle}
      />

      {monthListVisibility.isVisible && (
        <Animated.View
          style={{transform: [{scale: scaleAnim}], paddingHorizontal: 3}}
          key={'monthList'}>
          <MonthsList
            handleOnMonthPress={handleOnMonthPress}
            monthInInitialDate={monthInInitialDate}
            monthsArray={monthsArray}
          />
        </Animated.View>
      )}
      <MonthNavigator
        monthsArray={monthsArray}
        monthInInitialDate={monthInInitialDate}
        yearInInitialDate={yearInInitialDate}
        onMonthPress={monthListVisibility.toggle}
        goToNextMonth={() => handleGoToNextMonths(goToNextMonth)}
        goToPreviousMonth={() => handleGoToPreviousMonths(goToPreviousMonth)}
      />

      <PanGestureHandler onEnded={handleSwipe}>
        <Animated.View
          style={{
            paddingHorizontal: 8,
            transform: [{translateX: translateXAnim}],
          }}>
          <DaysList daysArray={daysArray} />
          {monthlyArray.map((weeklyArray, weekIndex) => {
            return (
              <WeekContainer key={`${weekIndex}-weekList`}>
                {weeklyArray.map((day, index) => (
                  <DayContainer
                    key={`${day}/${index}`}
                    day={day}
                    isSelected={isSameDate(
                      initialDateToRender,
                      new Date(
                        yearInInitialDate,
                        monthInInitialDate,
                        Number(day),
                      ),
                    )}
                    onDayPress={handleDatePress}
                  />
                ))}
              </WeekContainer>
            );
          })}

          {!isFooterRequired ? (
            <></>
          ) : !renderCustomFooter ? (
            <DefaultFooter
              cancelText="Cancel"
              submitText="Submit"
              onCancel={onCancel}
              onSubmit={handleSelectDate}
            />
          ) : (
            renderCustomFooter({
              cancelText: 'Cancel',
              submitText: 'Submit',
              onCancel: onCancel,
              onSubmit: handleSelectDate,
            })
          )}
        </Animated.View>
      </PanGestureHandler>
    </>
  );
};

export default AppCalendarPicker;
