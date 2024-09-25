import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {getDefaultContainerStyle} from '../Utils/defaultStyles';
import AppDatePicker from '../components/AppDatePicker';
import {useVisible} from '../Hooks/useVisible';
import AppButton from '../components/AppButton';

const DatePickerScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const {
    close: closeDatePicker,
    isVisible: isDatePickerVisible,
    open: openDatePicker,
  } = useVisible();
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    closeDatePicker();
  };
  return (
    <View style={styles.container}>
      <AppButton onPress={openDatePicker}>
        Selected Date : {selectedDate.toDateString()}
      </AppButton>

      <AppDatePicker
        closeDatePicker={closeDatePicker}
        date={selectedDate}
        isOpen={isDatePickerVisible}
        onDateSelect={handleDateSelect}
      />
    </View>
  );
};

export default DatePickerScreen;

const styles = StyleSheet.create({
  container: {...getDefaultContainerStyle().container},
  textStyle: {
    textAlign: 'center',
    marginVertical: 5,
  },
});
