import {View, Text, Animated, Easing, ScrollView} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {
  createYearList,
  DEFAULT_ENDING_YEAR,
  DEFAULT_STARTING_YEAR,
  findTheFirstDayOfTheWeekArray,
  findTheIndexOfDayOfTheMonth,
  findTheLastDateOfTheMonth,
  formatDate,
  getTheCalendarArray,
  INITIAL_YEARS_COUNT,
} from '../Utils/DateUtilFunctions';
import {
  daysArray,
  monthsArray,
} from '../../../constants/dateComponentConstants';
import MonthsList from '../DateCommonComponents/MonthsList';
import {useVisible} from '../../../Hooks/useVisible';
import MonthNavigator from '../DateCommonComponents/MonthNavigator';
import DaysList from '../DateCommonComponents/DaysList';
import YearNavigator from './YearNavigator';
import YearList from '../DateCommonComponents/YearList';
import {DefaultFooterProps} from '../DateCommonComponents/DefaultFooter';
import RenderCurrentMonthDates from './RenderCurrentMonthDates';
import FooterWrapper from '../DateCommonComponents/FooterWrapper';
import {generateMonthAnimationFn} from '../Utils/DateAnimateFns';
import ShowSelectedDates from './ShowSelectedDates';
import ShowSelectedDatesWrapper from './ShowSelectedDatesWrapper';

type CustomDateElementProps = {
  date: Date;
  isSelected: boolean;
  isDisabled: boolean;
  onDayPress: (date: Date) => void;
};

type AppMultiDatePickerProps = {
  dates: Date[];
  isFooterRequired?: boolean;
  onSelectDate: (date: Date[]) => void;
  onCancel: () => void;
  onDatePress?: (date: Date) => void;
  onMonthPress?: (date: Date) => void;
  onYearPress?: (date: Date) => void;
  getShouldDateDisabled?: (date: Date) => boolean;
  renderCustomFooter?:
    | null
    | ((props: DefaultFooterProps) => React.JSX.Element);
  renderCustomDayElement?:
    | ((props: CustomDateElementProps) => React.JSX.Element)
    | null;
};

const AppMultiDatePicker = ({
  dates,
  isFooterRequired = true,
  getShouldDateDisabled = (date: Date) => false,
  renderCustomFooter = null,
  onSelectDate,
  onCancel,
  onDatePress = (date: Date) => {},
  onMonthPress = (date: Date) => {},
  onYearPress = (date: Date) => {},
  renderCustomDayElement = null,
}: AppMultiDatePickerProps) => {
  const [initialDateToRender, setInitialDateToRender] = useState(
    () => new Date(),
  );
  const [yearBoundaries, setYearBoundaries] = useState({
    starting: DEFAULT_STARTING_YEAR,
    ending: DEFAULT_ENDING_YEAR,
  });
  const [selectedDates, setSelectedDate] = useState<Set<string>>(
    new Set(dates.map(formatDate)),
  );

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

  const selectedDatesArray = useMemo(() => [...selectedDates], [selectedDates]);

  const getIsSelectedDate = (date: Date) => selectedDates.has(formatDate(date));

  const handleGetIsSelectedDate = (day: string) => {
    const date = new Date(yearInInitialDate, monthInInitialDate, Number(day));
    return getIsSelectedDate(date);
  };

  const getMonthAnimationFn = (callback: () => void, value: number) => {
    return generateMonthAnimationFn(translateXAnim, callback, value);
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
    const formattedDate = formatDate(newDate);
    setSelectedDate(prev => {
      if (prev.has(formattedDate)) {
        prev.delete(formattedDate);
      } else prev.add(formattedDate);
      return new Set(prev);
    });
  };

  const handleSelectYear = (year: number) => {
    if (!year) return;
    const newDate = new Date(year, monthInInitialDate, dayInInitialDate);
    setInitialDateToRender(newDate);
    onYearPress(newDate);
    yearListVisibility.toggle();
  };

  const handleSelectDate = () => {
    const dates = [...selectedDates].map(dateString => new Date(dateString));
    onSelectDate(dates);
  };

  const handleCheckIsDateDisabled = (day: string) => {
    return getShouldDateDisabled(
      new Date(yearInInitialDate, monthInInitialDate, Number(day)),
    );
  };

  const handleSelectedDatesPress = (date: string) => {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = newDate.getMonth();
    const dateInNumber = newDate.getDate();
    handleOnMonthPress(month);
    if (yearInInitialDate !== year) {
      setInitialDateToRender(new Date(year, monthInInitialDate, dateInNumber));
    }
  };

  const handleDeleteFromSelectedDates = (date: string) => {
    if (!selectedDates.has(date)) return;
    setSelectedDate(prev => {
      prev.delete(date);
      return new Set(prev);
    });
  };

  const handleRenderCustomDateElement = () => {
    if (!renderCustomDayElement) return null;
    return (date: string) => {
      const newDate = new Date(
        yearInInitialDate,
        monthInInitialDate,
        Number(date),
      );
      return renderCustomDayElement({
        date: newDate,
        isDisabled: getShouldDateDisabled(newDate),
        isSelected: selectedDates.has(formatDate(newDate)),
        onDayPress: onDatePress,
      });
    };
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
      <ShowSelectedDatesWrapper
        dates={selectedDatesArray}
        onDatePress={handleSelectedDatesPress}
        onDelete={handleDeleteFromSelectedDates}
      />
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
          <RenderCurrentMonthDates
            getIsSelectedDate={handleGetIsSelectedDate}
            handleDatePress={handleDatePress}
            monthlyArray={monthlyArray}
            checkIsDateDisabled={handleCheckIsDateDisabled}
            renderCustomDayElement={handleRenderCustomDateElement()}
          />
          <FooterWrapper
            handleSelectDate={handleSelectDate}
            onCancel={onCancel}
            isFooterRequired={isFooterRequired}
            renderCustomFooter={renderCustomFooter}
          />
        </Animated.View>
      </PanGestureHandler>
    </>
  );
};

export default AppMultiDatePicker;
