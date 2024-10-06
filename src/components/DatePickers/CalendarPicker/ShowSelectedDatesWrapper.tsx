import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ShowSelectedDates from './ShowSelectedDates';

type ShowSelectedDatesWrapperProps = {
  dates: string[];
  onDatePress: (date: string) => void;
  onDelete: (date: string) => void;
};

const ShowSelectedDatesWrapper = ({
  dates,
  onDatePress,
  onDelete,
}: ShowSelectedDatesWrapperProps) => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDatePress = (date: string) => {
    onDatePress(date);
    setSelectedDate(date);
  };

  const handleDelete = (date: string) => {
    onDelete(date);
  };

  return (
    <ScrollView horizontal contentContainerStyle={{marginVertical: 10}}>
      {dates.map(date => (
        <ShowSelectedDates
          date={date}
          key={date}
          onDatePress={handleDatePress}
          onDelete={handleDelete}
          isSelected={selectedDate === date}
        />
      ))}
    </ScrollView>
  );
};

export default ShowSelectedDatesWrapper;

const styles = StyleSheet.create({});
