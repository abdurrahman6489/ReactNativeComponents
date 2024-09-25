import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import DatePicker, {DatePickerProps} from 'react-native-date-picker';
type AppDatePickerProps = {
  date: Date;
  isOpen: boolean;
  isModal?: boolean;
  closeDatePicker?: () => void;
  onDateSelect: (date: Date) => void;
} & DatePickerProps;

const AppDatePicker = ({
  date,
  isOpen,
  onDateSelect,
  closeDatePicker = () => {},
  isModal = true,
  ...remainingProps
}: AppDatePickerProps) => {
  const handleDateSelect = (date: Date) => {
    onDateSelect(date);
  };
  return (
    <DatePicker
      {...remainingProps}
      date={date}
      open={isOpen}
      onConfirm={handleDateSelect}
      onCancel={closeDatePicker}
      modal={isModal}
    />
  );
};

export default AppDatePicker;

const styles = StyleSheet.create({});
