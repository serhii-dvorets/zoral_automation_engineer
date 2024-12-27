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
  try {
    const response = await calendar.freebusy.query({
      requestBody: {
        timeMin,
        timeMax,
        items: [{ id: calendarId }],
      },
    });

    const busyIntervals = response.data.calendars[calendarId].busy;

    if (!busyIntervals.length) {
      console.log('No busy intervals found.');
      return;
    }

    console.log(
      `Busy intervals\n\n    from ${timeMin}\n    to ${timeMax}: `, busyIntervals.map(({start, end}) => ({
        start: new Date(start).toLocaleString(),
        end: new Date(end).toLocaleString()
      }))
    );

    return busyIntervals;
  } catch (error) {
    console.error('Error fetching busy intervals:', error);
  }
}

module.exports = { getBusyIntervals };