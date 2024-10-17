import {StyleSheet, Text, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import {useVisible} from '../../../Hooks/useVisible';
import YearList from '../DateCommonComponents/YearList';
import {
  createYearList,
  DEFAULT_ENDING_YEAR,
  DEFAULT_STARTING_YEAR,
  INITIAL_YEARS_COUNT,
} from '../Utils/DateUtilFunctions';
import {printInReadableFormat} from '../../../Utils/utilFunctions';

export type dateRangeType = {
  startDate: Date;
  endDate: Date;
};

type submitDateType = dateRangeType;

type DateRangePickerProps = {
  startDate?: Date;
  endDate?: Date;
  onSubmit: ({startDate, endDate}: submitDateType) => void;
  onCancel: () => void;
};

const AppDateRangePicker = ({
  startDate = new Date(),
  endDate = new Date(),
  onSubmit,
  onCancel,
}: DateRangePickerProps) => {
  const [initialDateToRender, setInitialDateToRender] = useState(
    () => startDate,
  );
  const [selectedRange, setSelectedRange] = useState<dateRangeType>({
    startDate,
    endDate,
  });

  printInReadableFormat(selectedRange, '');

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

  const handleStartYearClick = (year: number) => {
    changeDateRange({
      startDate: handleYearClick(year, selectedRange.startDate),
    });
  };

  const handleEndYearClick = (year: number) => {
    changeDateRange({
      endDate: handleYearClick(year, selectedRange.endDate),
    });
  };

  return (
    <View style={{width: '100%', height: '90%'}}>
      <YearList
        yearList={yearList}
        selectedYear={startYear}
        startingYear={yearBoundaries.starting}
        endingYear={yearBoundaries.ending}
        initialYearsToRender={INITIAL_YEARS_COUNT}
        onSelectYear={handleStartYearClick}
      />
      <YearList
        yearList={yearList}
        selectedYear={endYear}
        startingYear={yearBoundaries.starting}
        endingYear={yearBoundaries.ending}
        initialYearsToRender={INITIAL_YEARS_COUNT}
        onSelectYear={handleEndYearClick}
      />
    </View>
  );
};

export default AppDateRangePicker;

const styles = StyleSheet.create({});
