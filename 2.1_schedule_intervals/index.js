const {getBusyIntervals} = require('./getBusyIntervals.js');

const PUBLIC_CALENDAR_ID = 'nodemailertestdvorets@gmail.com'
const START_TIME = '2024-12-19T00:00:00-07:00'
const END_TIME = '2024-12-20T00:00:00-07:00'

getBusyIntervals(PUBLIC_CALENDAR_ID, START_TIME, END_TIME).catch(console.error);
