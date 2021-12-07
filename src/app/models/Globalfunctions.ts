export const GenerateTimeSlot = (
  start: any,
  end: any,
  timespan: any,
  eventsArray: any
) => {
  function dateClone(val: any) {
    return new Date(val);
  }
  function toDate(val: any) {
    if (val instanceof Date) return val;
    return new Date(val);
  }

  function dateExtend(date: any, timespanMS: any) {
    date.setTime(date.getTime() + timespanMS);
  }

  function availability(start: any, end: any, timespan: any, eventsArray: any) {
    const timespanMS = timespan * 1000;
    const timeslotStart = dateClone(start);
    const timeslotEnd = dateClone(start);
    dateExtend(timeslotEnd, timespanMS);

    const availArray = [];
    while (timeslotStart < toDate(end)) {
      if (true) {
        availArray.push({
          start: dateClone(timeslotStart),
          end: dateClone(timeslotEnd),
        });
      }
      dateExtend(timeslotStart, timespanMS);
      dateExtend(timeslotEnd, timespanMS);
    }

    return availArray;
  }

  const bookable = availability(start, end, timespan, eventsArray);
  const appoint = [];
  const slot1: any[] = [];
  const slot2: any[] = [];
  for (var i = 0; i < bookable.length; i++) {
    appoint.push(
      bookable[i].start
        .toTimeString()
        .replace('GMT+0530 (India Standard Time)', '')
        .replace(':00:00', '')
        .replace(':30:00', ':30') +
        'to' +
        bookable[i].end
          .toTimeString()
          .replace('GMT+0530 (India Standard Time)', '')
          .replace(':00', '')
    );
  }

  appoint.forEach((element) =>
    (element < '16 -16:30' ? slot1 : slot2).push(element)
  );

  return [slot1, slot2];

  //return availability(start, end, timespan, eventsArray);
};
