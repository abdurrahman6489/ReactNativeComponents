import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import AppButton from '../components/AppButton';
import AppModal from '../components/AppModal';
import {useVisible} from '../Hooks/useVisible';
import {getDefaultContainerStyle} from '../Utils/defaultStyles';
import {useColors} from '../config/useColors';
import {Text} from 'react-native-paper';
import AppDateRangePicker, {
  dateRangeType,
} from '../components/DatePickers/DateRangePicker';
import moment from 'moment';
import {formatInReadableDate} from '../components/DatePickers/Utils/DateUtilFunctions';

const initialDateRange: dateRangeType = {
  startDate: moment().toDate(),
  endDate: moment().add(7, 'days').toDate(),
};

const DateRangePickerScreenInModal = () => {
  const calendarVisibility = useVisible();
  const {lightModeColor, darkModeColor} = useColors();

  const [dateRange, setDateRange] = useState<dateRangeType>(initialDateRange);

  const {startDate, endDate} = dateRange;

  const onSelectDateRange = (dateRange: dateRangeType) => {
    setDateRange(dateRange);
    calendarVisibility.close();
  };

  const onCancel = () => {
    setDateRange(initialDateRange);
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
          <AppDateRangePicker
            onCancel={onCancel}
            onSubmit={onSelectDateRange}
            startDate={startDate}
            endDate={endDate}
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
          Selected Date Range : {formatInReadableDate(startDate)} TO
          {formatInReadableDate(endDate)}
        </Text>
      </View>
    </>
  );
};
export default DateRangePickerScreenInModal;

const styles = StyleSheet.create({
  container: {...getDefaultContainerStyle().container},
  contentContainerStyle: {
    marginHorizontal: 5,
    padding: 0,
    borderRadius: 10,
    overflow: 'hidden',
  },
});
