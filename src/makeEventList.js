import moment from 'moment';

const segmentStartDates = [
  '2021-02-08 00:00:00',
  '2021-03-08 00:00:00',
  '2021-04-08 00:00:00',
  '2021-05-08 00:00:00',
  '2021-06-08 00:00:00',
  '2021-07-08 00:00:00',
];

const segmentEndDates = [
  '2021-03-08 00:00:00',
  '2021-04-08 00:00:00',
  '2021-05-08 00:00:00',
  '2021-06-08 00:00:00',
  '2021-07-08 00:00:00',
  '2021-08-08 00:00:00',
];

const slotInfo = {
  A: [
    {
      day: 1,
      hour: 9,
      minute: 0,
      duration: 55,
    },
    {
      day: 3,
      hour: 11,
      minute: 0,
      duration: 55,
    },
    {
      day: 4,
      hour: 10,
      minute: 0,
      duration: 55,
    },
  ],
  B: [
    {
      day: 1,
      hour: 10,
      minute: 0,
      duration: 55,
    },
    {
      day: 3,
      hour: 9,
      minute: 0,
      duration: 55,
    },
    {
      day: 4,
      hour: 11,
      minute: 0,
      duration: 55,
    },
  ],
  C: [
    {
      day: 1,
      hour: 11,
      minute: 0,
      duration: 55,
    },
    {
      day: 3,
      hour: 10,
      minute: 0,
      duration: 55,
    },
    {
      day: 4,
      hour: 9,
      minute: 0,
      duration: 55,
    },
  ],
  D: [
    {
      day: 1,
      hour: 12,
      minute: 0,
      duration: 55,
    },
    {
      day: 2,
      hour: 9,
      minute: 0,
      duration: 55,
    },
    {
      day: 5,
      hour: 11,
      minute: 0,
      duration: 55,
    },
  ],
  E: [
    {
      day: 2,
      hour: 10,
      minute: 0,
      duration: 55,
    },
    {
      day: 4,
      hour: 12,
      minute: 0,
      duration: 55,
    },
    {
      day: 5,
      hour: 9,
      minute: 0,
      duration: 55,
    },
  ],
  F: [
    {
      day: 2,
      hour: 11,
      minute: 0,
      duration: 55,
    },
    {
      day: 3,
      hour: 14,
      minute: 30,
      duration: 55,
    },
    {
      day: 5,
      hour: 10,
      minute: 0,
      duration: 55,
    },
  ],
  G: [
    {
      day: 2,
      hour: 12,
      minute: 0,
      duration: 55,
    },
    {
      day: 3,
      hour: 12,
      minute: 0,
      duration: 55,
    },
    {
      day: 5,
      hour: 12,
      minute: 0,
      duration: 55,
    },
  ],
  P: [
    {
      day: 1,
      hour: 14,
      minute: 30,
      duration: 85,
    },
    {
      day: 4,
      hour: 16,
      minute: 0,
      duration: 85,
    },
  ],
  Q: [
    {
      day: 1,
      hour: 16,
      minute: 0,
      duration: 85,
    },
    {
      day: 4,
      hour: 14,
      minute: 30,
      duration: 85,
    },
  ],
  R: [
    {
      day: 2,
      hour: 14,
      minute: 30,
      duration: 85,
    },
    {
      day: 5,
      hour: 16,
      minute: 0,
      duration: 85,
    },
  ],
  S: [
    {
      day: 2,
      hour: 16,
      minute: 0,
      duration: 85,
    },
    {
      day: 5,
      hour: 14,
      minute: 30,
      duration: 85,
    },
  ],
};

function makeEventList(aimsTimeTable, customEventList) {
  const courseEvents = [];

  if (aimsTimeTable) {
    aimsTimeTable.identifiedCourses.forEach((courseCode, index) => {
      const startSegment = Number(aimsTimeTable.identifiedSegments[index][0]);
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
            end: courseTime.clone().add(currSlot.duration, 'minutes').toDate(),
            title: courseCode,
          });

          i += 7;
        }
      });
    });
  }

  return [...courseEvents, ...customEventList];
}

export default makeEventList;
