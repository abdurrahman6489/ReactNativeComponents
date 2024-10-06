import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import AppMultiDatePicker from '../components/DatePickers/CalendarPicker/MultiDatePicker';
import AppButton from '../components/AppButton';
import AppModal from '../components/AppModal';
import {useVisible} from '../Hooks/useVisible';
import {getDefaultContainerStyle} from '../Utils/defaultStyles';
import {useColors} from '../config/useColors';
import {Text} from 'react-native-paper';

const MultiDatePickerScreenInModal = () => {
  const calendarVisibility = useVisible();
  const {lightModeColor, darkModeColor} = useColors();
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const onSelectDate = (dates: Date[]) => {
    setSelectedDates([...dates]);
    calendarVisibility.close();
  };

  const onCancel = () => {
    setSelectedDates([]);
    calendarVisibility.close();
  };

  const handleOpenModal = () => {
    calendarVisibility.open();
    // setSelectedDates([]);
  };

  return (
    <>
      <View style={[styles.container, {backgroundColor: lightModeColor}]}>
        <AppButton onPress={handleOpenModal}>{'Select Date'}</AppButton>
        <AppModal
          visible={calendarVisibility.isVisible}
          onDismiss={calendarVisibility.close}
          contentContainerStyle={[
            styles.contentContainerStyle,
            {
              backgroundColor: lightModeColor,
            },
          ]}>
          <AppMultiDatePicker
            dates={selectedDates}
            onCancel={onCancel}
            onSelectDate={onSelectDate}
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
          Selected Dates : {selectedDates.length}
        </Text>
      </View>
    </>
  );
};
export default MultiDatePickerScreenInModal;

const styles = StyleSheet.create({
  container: {...getDefaultContainerStyle().container},
  contentContainerStyle: {
    marginHorizontal: 5,
    padding: 0,
    borderRadius: 10,
    overflow: 'hidden',
  },
});
