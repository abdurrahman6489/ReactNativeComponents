import {FlatList} from 'react-native';
import React, {useEffect, useRef} from 'react';
import SelectYear from '../CalendarPicker/components/SelectYear';
import AppDivider from '../../AppDivider';

type YearListProps = {
  yearList: number[];
  selectedYear: number;
  startingYear: number;
  endingYear: number;
  initialYearsToRender: number;
  onSelectYear: (year: number) => void;
};

const YearList = ({
  yearList,
  onSelectYear,
  selectedYear,
  startingYear,
  endingYear,
  initialYearsToRender,
}: YearListProps) => {
  const flatListRef = useRef<FlatList>(null);
  const getInitialYearIndex = (year: number) => year - startingYear;
  const checkIsSelected = (year: number) => year === selectedYear;

  const onScrollIndexFailed = (info: {
    index: number;
    highestMeasuredFrameIndex: number;
    averageItemLength: number;
  }) => {
    // Scroll to the nearest valid index first, e.g., scroll to the beginning
    flatListRef.current?.scrollToIndex({
      index: Math.max(info.highestMeasuredFrameIndex, 0),
      animated: false,
    });

    // Retry scrolling to the failed index with a delay
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({index: info.index, animated: false});
    }, 500); // Adjust delay as needed
  };

  useEffect(() => {
    if (!flatListRef?.current?.scrollToIndex) return;
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({
        index: getInitialYearIndex(selectedYear),
        animated: false,
      });
    }, 500);
  }, []);

  return (
    <FlatList
      data={yearList}
      ref={flatListRef}
      renderItem={({item}) => (
        <SelectYear
          year={item}
          onYearPress={onSelectYear}
          isSelectedYear={checkIsSelected(item)}
        />
      )}
      ItemSeparatorComponent={() => <AppDivider />}
      extraData={selectedYear}
      onScrollToIndexFailed={onScrollIndexFailed}
      // initialNumToRender={initialYearsToRender}
    />
  );
};

export default YearList;
