import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppChip from '../AppChip';
import SelectMonth from './components/SelectMonth';

type monthListProps = {
  monthsArray: string[];
  monthInInitialDate: number;
  handleMonthOnPress: (monthIndex: number) => void;
};

const MonthsList = ({
  monthsArray,
  monthInInitialDate,
  handleMonthOnPress,
}: monthListProps) => {
  return (
    <ScrollView horizontal style={{marginVertical: 10}}>
      {monthsArray.map((month, index) => {
        const isMonthSelected = monthInInitialDate === index;
        return (
          <SelectMonth
            key={`${month}/${index}`}
            isMonthSelected={isMonthSelected}
            monthName={month.substring(0, 3)}
            onMonthPress={() => handleMonthOnPress(index)}
          />
        );
      })}
    </ScrollView>
  );
};

export default MonthsList;

const styles = StyleSheet.create({
  month: {
    height: 35,
    marginHorizontal: 5,
  },
});

{
}
