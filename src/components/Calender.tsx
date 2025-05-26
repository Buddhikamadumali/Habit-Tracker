import React from 'react';
import {Calendar} from 'react-native-calendars';

type CalendarComponentProps = {
  selectedDate: string;
  onDateChange: (date: string) => void;
};

const Calender: React.FC<CalendarComponentProps> = ({
  selectedDate,
  onDateChange,
}) => {
  return (
    <Calendar
      onDayPress={day => onDateChange(day.dateString)}
      markedDates={{
        [selectedDate]: {
          selected: true,
          selectedColor: '#fdd835',
        },
      }}
      current={selectedDate}
    />
  );
};

export default Calender;
