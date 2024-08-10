import React from 'react';
import {useState} from 'react';
import {Calendar} from 'react-native-calendars';
import {Stack} from 'native-base';

const Calendario = () => {
  const [selected, setSelected] = useState('');

  return (
    <Stack display="flex" alignItems="center">
      <Calendar
        onDayPress={day => {
          setSelected(day.dateString);
        }}
        markedDates={{
          [selected]: {selected: true, disableTouchEvent: true},
        }}
        style={{
          height: 274,
          width: 367,
        }}
        theme={{
          backgroundColor: '#21242D',
          calendarBackground: '#21242D',
          textSectionTitleColor: '#b6c1cd',
          textSectionTitleDisabledColor: '#d9e1e8',
          selectedDayTextColor: '#16171D',
          todayTextColor: '#FFFFFF',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          dotColor: '#F5C249',
          selectedDotColor: '#F5C249',
          arrowColor: '#FFFFFF',
          disabledArrowColor: '#d9e1e8',
          monthTextColor: '#FFFFFF',
          indicatorColor: '#F5C249',
          textDayFontFamily: 'Poppins',
          textMonthFontFamily: 'Poppins',
          textDayHeaderFontFamily: 'Poppins',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16,
        }}
      />
    </Stack>
  );
};

export default Calendario;
