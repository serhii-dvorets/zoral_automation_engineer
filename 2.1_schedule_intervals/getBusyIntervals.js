const { google } = require('googleapis');
const { JWT } = require('google-auth-library');
const path = require('path');

const KEYFILE_PATH = path.join(__dirname, 'credentials.json');

const auth = new JWT({
  keyFile: KEYFILE_PATH,
  scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
});

const calendar = google.calendar({ version: 'v3', auth });

async function getBusyIntervals(calendarId, timeMin, timeMax) {
  const events = await listEvents(calendarId, timeMin, timeMax)
  if (!events.length) {
    console.log('No upcoming events found.');
    return
  }

  const busyIntervals = getEventsIntervals(events)

  console.log(
    `Busy intervals
  
    from ${timeMin}
    to ${timeMax}: `, busyIntervals
  );
}

function getEventsIntervals(events) {
  const intervals = []

  events.forEach((event) => {
    const interval = {
      startDate: '',
      endDate: '',
    }

    const {start, end} = event;

    if (!intervals.length) {

      interval.startDate = start.dateTime
      interval.endDate = end.dateTime
      intervals.push(interval)

      return 
    }

    const lastPushedEvent = intervals[intervals.length - 1]

    const isGapBetweenEvents = hasGap(start.dateTime, lastPushedEvent.endDate)

    if (isGapBetweenEvents) {
      interval.startDate = start.dateTime
      interval.endDate = end.dateTime
      intervals.push(interval)
    } else {
      intervals.splice(-1, 1, {
        startDate: lastPushedEvent.startDate,
        endDate: end.dateTime
      })
    }

  });

  return intervals;
}

async function listEvents(calendarId, timeMin, timeMax) {
  const response = await calendar.events.list({
    calendarId,
    timeMin,
    timeMax,
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  });

  return response.data.items;
}

function hasGap(date1, date2) {
  const difference = new Date(date1).getTime() - new Date(date2).getTime()

  return difference ? true : false
}

module.exports = {getBusyIntervals}