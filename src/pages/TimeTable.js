import React from 'react';
import PropTypes from 'prop-types';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function TimeTable({ eventList }) {
  console.log(eventList);

  // Custom accessors needed since the eventList is stored in localStorage, where the
  // Date is stringified
  return (
    <Calendar
      localizer={localizer}
      events={eventList}
      defaultDate={new Date()}
      startAccessor={(event) => new Date(event.start)}
      endAccessor={(event) => new Date(event.end)}
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
