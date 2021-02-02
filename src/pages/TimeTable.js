import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function TimeTable() {
  const eventList = useState([
    {
      start: moment().toDate(),
      end: moment().add(1, 'days').toDate(),
      title: 'Some title',
    },
  ]);

  return (
    <Calendar
      localizer={localizer}
      events={eventList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  );
}
export default TimeTable;
