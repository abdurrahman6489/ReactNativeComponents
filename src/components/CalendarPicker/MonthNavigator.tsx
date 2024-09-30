import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppIconButton from '../AppIconButton';
import {getDefaultFlexStyles} from '../../Utils/defaultStyles';

type MonthNavigatorProps = {
  monthsArray: string[];
  monthInInitialDate: number;
  yearInInitialDate: number;
  onMonthPress: () => void;
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
};

const MonthNavigator = ({
  monthsArray,
  monthInInitialDate,
  yearInInitialDate,
  onMonthPress,
  goToNextMonth,
  goToPreviousMonth,
}: MonthNavigatorProps) => {
  return (
    <View style={styles.monthContainer} key={'month'}>
      <AppIconButton
        icon={'arrow-left'}
        size={20}
        onPress={goToPreviousMonth}
      />
      <Text style={styles.month} onPress={onMonthPress}>
        {monthsArray[monthInInitialDate]}, {yearInInitialDate}
      </Text>
      <AppIconButton icon={'arrow-right'} size={20} onPress={goToNextMonth} />
    </View>
  );
};

export default MonthNavigator;

const styles = StyleSheet.create({
  monthContainer: {...getDefaultFlexStyles().flexRowStyles},
  month: {textAlign: 'center', fontSize: 15, fontWeight: '600'},
});
