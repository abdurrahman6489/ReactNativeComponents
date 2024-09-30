import React, {useState} from 'react';
import AppCalendarPicker from '../components/CalendarPicker';

const CalendarListScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const onSelectDate = (date: Date) => setSelectedDate(date);
  return (
    <AppCalendarPicker
      date={selectedDate}
      onSelectDate={onSelectDate}
      onCancel={() => {}}
    />
  );
};

export default CalendarListScreen;
