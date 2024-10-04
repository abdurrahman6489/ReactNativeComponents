import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import SelectMonth from './SelectMonth';

type monthListProps = {
  monthsArray: string[];
  monthInInitialDate: number;
  handleOnMonthPress: (monthIndex: number) => void;
};

const MonthsList = ({
  monthsArray,
  monthInInitialDate,
  handleOnMonthPress,
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
            onMonthPress={() => handleOnMonthPress(index)}
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
