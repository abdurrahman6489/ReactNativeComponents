import React, {useState} from 'react';
import AppCalendarPicker from '../components/CalendarPicker';
import {useColors} from '../config/useColors';
import {StyleSheet, View} from 'react-native';

const CalendarListScreen = () => {
  const {lightModeColor} = useColors();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const onSelectDate = (date: Date) => setSelectedDate(date);
  return (
    <View style={[styles.container, {backgroundColor: lightModeColor}]}>
      <AppCalendarPicker
        date={selectedDate}
        onSelectDate={onSelectDate}
        onCancel={() => {}}
      />
    </View>
  );
};

export default CalendarListScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
});
