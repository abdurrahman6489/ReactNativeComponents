import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import AppDateRangePicker from '../components/CalendarPicker/DateRangePicker';
import AppButton from '../components/AppButton';
import AppModal from '../components/AppModal';
import {useVisible} from '../Hooks/useVisible';
import {getDefaultContainerStyle} from '../Utils/defaultStyles';
import {useColors} from '../config/useColors';
import {Text} from 'react-native-paper';

const DateRangeScreenInModal = () => {
  const calendarVisibility = useVisible();
  const {light} = useColors();
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
      <View style={styles.container}>
        <AppButton onPress={calendarVisibility.open}>{'Select Date'}</AppButton>
        <AppModal
          visible={calendarVisibility.isVisible}
          onDismiss={calendarVisibility.close}
          contentContainerStyle={[
            styles.contentContainerStyle,
            {
              backgroundColor: light,
            },
          ]}>
          <AppDateRangePicker
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
          }}>
          Selected Date : {selectedDate.toDateString()}
        </Text>
      </View>
    </>
  );
};
export default DateRangeScreenInModal;

const styles = StyleSheet.create({
  container: {...getDefaultContainerStyle().container},
  contentContainerStyle: {
    marginHorizontal: 5,
    padding: 0,
    borderRadius: 10,
    overflow: 'hidden',
  },
});
