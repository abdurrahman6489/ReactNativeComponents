import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import AppCalendarPicker from '../components/DatePickers/CalendarPicker';
import AppButton from '../components/AppButton';
import AppModal from '../components/AppModal';
import {useVisible} from '../Hooks/useVisible';
import {getDefaultContainerStyle} from '../Utils/defaultStyles';
import {useColors} from '../config/useColors';
import {Text} from 'react-native-paper';
import {markedDateStyle} from '../components/DatePickers/DateCommonComponents/types';

const CalendarScreenInModal = () => {
  const calendarVisibility = useVisible();
  const {lightModeColor, darkModeColor, primary, secondary} = useColors();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onSelectDate = (date: Date) => {
    setSelectedDate(date);
    calendarVisibility.close();
  };

  const onCancel = () => {
    setSelectedDate(new Date());
    calendarVisibility.close();
  };

  const markTheDateWithDot = (date: Date): markedDateStyle => {
    return date.getDay() === 0
      ? {
          isMarked: true,
          markedColor: primary,
          selectedDateMarkedColor: lightModeColor,
        }
      : {isMarked: false, markedColor: '', selectedDateMarkedColor: ''};
  };

  return (
    <>
      <View style={[styles.container, {backgroundColor: lightModeColor}]}>
        <AppButton onPress={calendarVisibility.open}>{'Select Date'}</AppButton>
        <AppModal
          visible={calendarVisibility.isVisible}
          onDismiss={calendarVisibility.close}
          contentContainerStyle={[
            styles.contentContainerStyle,
            {
              backgroundColor: lightModeColor,
            },
          ]}>
          <AppCalendarPicker
            date={selectedDate}
            onSelectDate={onSelectDate}
            onCancel={onCancel}
            getMarkedStyle={markTheDateWithDot}
          />
        </AppModal>
        <Text
          style={{
            marginVertical: 5,
            textAlign: 'center',
            fontSize: 20,
            fontWeight: '300',
            color: darkModeColor,
          }}>
          Selected Date : {selectedDate.toDateString()}
        </Text>
      </View>
    </>
  );
};
export default CalendarScreenInModal;

const styles = StyleSheet.create({
  container: {...getDefaultContainerStyle().container},
  contentContainerStyle: {
    marginHorizontal: 5,
    padding: 0,
    borderRadius: 10,
    overflow: 'hidden',
  },
});
