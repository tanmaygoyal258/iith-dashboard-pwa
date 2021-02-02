import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function TimeTable() {
  // Need to be pulling this from firebase
  // Also needs to have its own local storage variant to see if changes occured
  const aimsTimeTable = {
    email: 'abc',
    identifiedCourses: ['LA1234', 'AB1212'],
    identifiedSegments: ['14', '12'],
    identifiedSlots: ['C', 'A'],
  };

  // Preferably in a config file or an API
  const segmentStartDates = [
    '2021-02-08 00:00:00',
    '2021-03-08 00:00:00',
    '2021-04-08 00:00:00',
    '2021-05-08 00:00:00',
    '2021-06-08 00:00:00',
    '2021-07-08 00:00:00',
  ];

  // Preferably in a config file or an API
  const segmentEndDates = [
    '2021-03-08 00:00:00',
    '2021-04-08 00:00:00',
    '2021-05-08 00:00:00',
    '2021-06-08 00:00:00',
    '2021-07-08 00:00:00',
    '2021-08-08 00:00:00',
  ];

  // Preferably in a config file or an API
  const slotInfo = {
    C: [
      {
        day: 3, hour: 14, minute: 30, duration: 85,
      },
      {
        day: 4, hour: 14, minute: 30, duration: 85,
      },
    ],
    A: [{
      day: 1, hour: 17, minute: 0, duration: 55,
    }],
  };

  // Should be using localstorage
  const [eventList, setEventList] = useState([
    {
      start: moment().toDate(),
      end: moment().add(1, 'days').toDate(),
      title: 'Some title',
    },
  ]);

  useEffect(() => {
    // First check if aimsdata has changed
    const courseEvents = [];
    aimsTimeTable.identifiedCourses.forEach((courseCode, index) => {
      const startSegment = Number(
        aimsTimeTable.identifiedSegments[index][0],
      );
      const endSegment = Number(
        aimsTimeTable.identifiedSegments[index].slice(-1),
      );

      const slot = aimsTimeTable.identifiedSlots[index];
      const segmentStartDate = moment(segmentStartDates[startSegment - 1]);
      const segmentEndDate = moment(segmentEndDates[endSegment - 1]);

      slotInfo[slot].forEach((currSlot) => {
        let i = currSlot.day;

        while (true) {
          const courseTime = segmentStartDate
            .clone()
            .weekday(i)
            .add(currSlot.hour, 'hours')
            .add(currSlot.minute, 'minutes');

          if (courseTime.isBefore(segmentStartDate)) {
            i += 7;
            continue; //eslint-disable-line
          }

          if (courseTime.isAfter(segmentEndDate)) {
            break;
          }

          courseEvents.push({
            start: courseTime.toDate(),
            end: courseTime
              .clone()
              .add(currSlot.duration, 'minutes')
              .toDate(),
            title: courseCode,
          });

          i += 7;
        }
      });
    });

    setEventList((currList) => [...currList, ...courseEvents]);
  }, []);

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
export default TimeTable;
