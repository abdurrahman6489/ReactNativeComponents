import React, {useState, useMemo, useCallback} from 'react';
import {StyleSheet, Text, View, TextStyle} from 'react-native';
import {getDefaultContainerStyle} from '../Utils/defaultStyles';
export const daysArray = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
export const monthsArray = [
  'January',
  'Febraury',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const initialDate = new Date();
const CalendarListScreen = () => {
  const [initialDateToRender, setInitialDateToRender] = useState(
    () => initialDate,
  );
  const dateInInitialDate = initialDateToRender.getDate();
  const monthInInitialDate = initialDateToRender.getMonth();
  const yearInInitialDate = initialDateToRender.getFullYear();

  const findTheStartingDayOfTheMonth = (month: number, year: number) => {};

  return (
    <View style={styles.container}>
      <Text style={styles.month}>{monthsArray[monthInInitialDate]}</Text>
      <View style={styles.daysHeaderContainer}>
        {daysArray.map(day => (
          <Text key={day}>{day}</Text>
        ))}
      </View>
    </View>
  );
};

export default CalendarListScreen;

const styles = StyleSheet.create({
  container: {...getDefaultContainerStyle().container},
  month: {textAlign: 'center', fontSize: 15, fontWeight: '600'},
  daysHeaderContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },

  year: {
    marginRight: 5,
  },
});
