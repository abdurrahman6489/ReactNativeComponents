import {Animated, Easing, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useVisible} from '../../../Hooks/useVisible';
import YearList from '../DateCommonComponents/YearList';
import {
  createYearList,
  DEFAULT_ENDING_YEAR,
  DEFAULT_STARTING_YEAR,
  findTheFirstDayOfTheWeekArray,
  findTheIndexOfDayOfTheMonth,
  findTheLastDateOfTheMonth,
  getTheCalendarArray,
  INITIAL_YEARS_COUNT,
  isSameDate,
} from '../Utils/DateUtilFunctions';
import YearWrapper from './YearWrapper';
import {useColors} from '../../../config/useColors';
import DateRangeYearNavigatorContainer from './DateRangeYearNavigatorContainer';
import DateRangeYearNavigatorText from './DateRangeYearNavigatorText';
import MonthsList from '../DateCommonComponents/MonthsList';
import {
  daysArray,
  monthsArray,
} from '../../../constants/dateComponentConstants';
import MonthNavigator from '../DateCommonComponents/MonthNavigator';
import {PanGestureHandler} from 'react-native-gesture-handler';
import DaysList from '../DateCommonComponents/DaysList';
import RenderCurrentMonthDates from '../CalendarPicker/RenderCurrentMonthDates';
import DateRangeRenderCurrentMonthDates from './DateRangeRenderCurrentMonthDates';
import moment from 'moment';
import {
  CustomDateElementProps,
  dateRangeSelectionStatusType,
  startEndCurrentDatesType,
} from '../DateCommonComponents/types';
import {dateRangeSelectionStatusObj} from './initialData';
import ShowYearWithLabel from './ShowYearWithLabel';

export type dateRangeType = {
  startDate: Date;
  endDate: Date;
};

type submitDateType = dateRangeType;

type DateRangePickerProps = {
  startDate?: Date;
  endDate?: Date;
  initialDate?: Date;
  onDatePress?: ({
    startDate,
    endDate,
    currentDate,
  }: startEndCurrentDatesType) => void;
  onMonthPress?: (date: Date) => void;
  onSubmit: ({startDate, endDate}: submitDateType) => void;
  onCancel: () => void;
  renderCustomDayElement?:
    | ((props: CustomDateElementProps) => React.JSX.Element)
    | null;
};

type startEndDatePressStatusType = {
  startDatePressed: boolean;
  endDatePressed: boolean;
};

const AppDateRangePicker = ({
  startDate = new Date(),
  endDate = moment(new Date()).add(7, 'days').toDate(),
  initialDate = new Date(),
  onMonthPress = (date: Date) => {},
  renderCustomDayElement = null,
  onSubmit,
  onCancel,
}: DateRangePickerProps) => {
  const [initialDateToRender, setInitialDateToRender] = useState(
    () => initialDate,
  );
  const [selectedRange, setSelectedRange] = useState<dateRangeType>({
    startDate,
    endDate,
  });

  const [dateRangeSelectionStatus, setDateRangeSelectionStatus] =
    useState<dateRangeSelectionStatusType>(
      dateRangeSelectionStatusObj.notSelected,
    );

  const {light} = useColors();
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const translateXAnim = useRef(new Animated.Value(0)).current;
  const startYear = selectedRange.startDate.getFullYear();
  const endYear = selectedRange.endDate.getFullYear();

  const [yearBoundaries, setYearBoundaries] = useState({
    starting: DEFAULT_STARTING_YEAR,
    ending: DEFAULT_ENDING_YEAR,
  });
  const monthListVisibility = useVisible();
  const startYearListVisibility = useVisible();
  const endYearListVisibility = useVisible();
  const isYearListVisible =
    startYearListVisibility.isVisible || endYearListVisibility.isVisible;
  const dayInInitialDate = initialDateToRender.getDate();
  const monthInInitialDate = initialDateToRender.getMonth();
  const yearInInitialDate = initialDateToRender.getFullYear();
  const yearList = useMemo(() => {
    return createYearList(yearBoundaries.ending, yearBoundaries.starting);
  }, [yearBoundaries]);

  const changeDateRange = (fields: Partial<dateRangeType>) => {
    setSelectedRange(prev => ({...prev, ...fields}));
  };

  const handleYearClick = (year: number, date: Date) => {
    const currentDate = date.getDate() + 1;
    const currentMonth = date.getMonth();
    return new Date(year, currentMonth, currentDate);
  };

  const handleStartYearClick = (year: number, closeTheYearList: () => void) => {
    changeDateRange({
      startDate: handleYearClick(year, selectedRange.startDate),
    });
    closeTheYearList();
  };

  const handleEndYearClick = (year: number, closeTheYearList: () => void) => {
    changeDateRange({
      endDate: handleYearClick(year, selectedRange.endDate),
    });
    closeTheYearList();
  };

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

  const getCurrentDate = (day: string) => {
    return new Date(
      Date.UTC(yearInInitialDate, monthInInitialDate, Number(day)),
    );
  };

  const getIsDateInRange = (day: string) => {
    if (dateRangeSelectionStatus === dateRangeSelectionStatusObj.selecting)
      return false;
    const currentDate = getCurrentDate(day);
    return (
      currentDate > selectedRange.startDate &&
      currentDate < selectedRange.endDate
    );
  };

  const getIsStartDate = (day: string) => {
    const currentDate = getCurrentDate(day);
    return isSameDate(selectedRange.startDate, currentDate);
  };
  const getIsEndDate = (day: string) => {
    if (dateRangeSelectionStatus === dateRangeSelectionStatusObj.selecting)
      return false;
    const currentDate = getCurrentDate(day);
    return isSameDate(selectedRange.endDate, currentDate);
  };

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

  const getDateRangeSetFnObj = (newDate: Date) => {
    const dateRangeSetFnObj = {
      notSelected: () => {
        setDateRangeSelectionStatus(dateRangeSelectionStatusObj.selecting);
        changeDateRange({startDate: newDate});
      },
      selecting: () => {
        setDateRangeSelectionStatus(dateRangeSelectionStatusObj.selected);
        changeDateRange({endDate: newDate});
      },
      selected: () => {
        setDateRangeSelectionStatus(dateRangeSelectionStatusObj.selecting);
        changeDateRange({startDate: newDate});
      },
    };
    return dateRangeSetFnObj;
  };

  const handleDatePress = (day: string) => {
    if (!day) return;
    const newDate = new Date(
      Date.UTC(yearInInitialDate, monthInInitialDate, Number(day)),
    );
    setInitialDateToRender(newDate);
    const currentSetDateRangeFn =
      getDateRangeSetFnObj(newDate)[dateRangeSelectionStatus];
    currentSetDateRangeFn();
  };

  const handleCheckIsDateDisabled = (day: string) => {
    return false;
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

  return (
    <View style={{width: '100%'}}>
      {isYearListVisible ? (
        <>
          {startYearListVisibility.isVisible ? (
            <YearList
              yearList={yearList}
              selectedYear={startYear}
              startingYear={yearBoundaries.starting}
              endingYear={yearBoundaries.ending}
              initialYearsToRender={INITIAL_YEARS_COUNT}
              onSelectYear={(year: number) =>
                handleStartYearClick(year, startYearListVisibility.toggle)
              }
            />
          ) : null}
          {endYearListVisibility.isVisible ? (
            <YearList
              yearList={yearList}
              selectedYear={endYear}
              startingYear={yearBoundaries.starting}
              endingYear={yearBoundaries.ending}
              initialYearsToRender={INITIAL_YEARS_COUNT}
              onSelectYear={(year: number) =>
                handleEndYearClick(year, endYearListVisibility.toggle)
              }
            />
          ) : null}
        </>
      ) : (
        <>
          <YearWrapper>
            {/* <DateRangeYearNavigatorContainer
              onYearPress={startYearListVisibility.toggle}
              style={{borderColor: light, borderWidth: 0.5, borderRadius: 5}}>
              <Text style={{color: light}}>Start Year</Text>
              <DateRangeYearNavigatorText
                currentYear={startYear}
                style={{color: light, textAlign: 'center'}}
              />
            </DateRangeYearNavigatorContainer>
            <DateRangeYearNavigatorContainer
              onYearPress={endYearListVisibility.toggle}
              style={{borderColor: light, borderWidth: 0.5, borderRadius: 5}}>
              <Text style={{color: light}}>End Year</Text>
              <DateRangeYearNavigatorText
                currentYear={endYear}
                style={{color: light, textAlign: 'center'}}
              />
            </DateRangeYearNavigatorContainer> */}
            <ShowYearWithLabel label="Start Year" year={startYear} />
            <ShowYearWithLabel label="End Year" year={endYear} />
          </YearWrapper>
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
            goToPreviousMonth={() =>
              handleGoToPreviousMonths(goToPreviousMonth)
            }
          />
          <PanGestureHandler onEnded={handleSwipe}>
            <Animated.View
              style={{
                paddingHorizontal: 8,
                transform: [{translateX: translateXAnim}],
              }}>
              <DaysList daysArray={daysArray} />
              {
                <DateRangeRenderCurrentMonthDates
                  handleDatePress={handleDatePress}
                  monthlyArray={monthlyArray}
                  checkIsDateDisabled={handleCheckIsDateDisabled}
                  renderCustomDayElement={null}
                  getCurrentDate={getCurrentDate}
                  getIsEndOFRange={getIsEndDate}
                  getIsInDateRange={getIsDateInRange}
                  getIsStartOfRange={getIsStartDate}
                />
                /*<FooterWrapper
                handleSelectDate={handleSelectDate}
                onCancel={onCancel}
                isFooterRequired={isFooterRequired}
                renderCustomFooter={renderCustomFooter}
              /> */
              }
            </Animated.View>
          </PanGestureHandler>
        </>
      )}
    </View>
  );
};

export default AppDateRangePicker;

const styles = StyleSheet.create({});
