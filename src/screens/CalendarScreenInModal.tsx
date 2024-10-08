import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import AppCalendarPicker from '../components/DatePickers/CalendarPicker';
import AppButton from '../components/AppButton';
import AppModal from '../components/AppModal';
import {useVisible} from '../Hooks/useVisible';
import {getDefaultContainerStyle} from '../Utils/defaultStyles';
import {useColors} from '../config/useColors';
import {Text} from 'react-native-paper';

const CalendarScreenInModal = () => {
  const calendarVisibility = useVisible();
  const {lightModeColor, darkModeColor} = useColors();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const onSelectDate = (date: Date) => {
    setSelectedDate(date);
    calendarVisibility.close();
  };

  const onCancel = () => {
    setSelectedDate(new Date());
    calendarVisibility.close();
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
