import React from 'react';
import PropTypes from 'prop-types';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function TimeTable({ eventList }) {
  console.log(eventList);
  return (
    <Calendar
      localizer={localizer}
      events={eventList}
      defaultDate={new Date()}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  );
}

TimeTable.propTypes = {
  eventList: PropTypes.arrayOf(PropTypes.object),
};

TimeTable.defaultProps = {
  eventList: [],
};

export default TimeTable;
