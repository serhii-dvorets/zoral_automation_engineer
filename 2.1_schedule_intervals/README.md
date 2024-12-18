## Schedule viewer app

## Configure and run app
1. Switch to the project root folder, run `cd 2.1_schedule_intervals`
2. run `npm i` (or `npm install`)
3. place file credentials.json in the root of the project, 
- run `touch credentials.json` 
- fill it up with credentials, provided to use with the project (ask the developer for them)

Eventually it should look like that

{
  "type": "service_account",
  "project_id": `PROJECT_ID`,
  "private_key_id": `PRIVATE_KEY_ID`,
  "private_key": `PRIVATE_KEY`,
  "client_email": `CLIENT_EMAIL`,
  "client_id": `CLIENT_ID`,
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/schedule-viewer-app%40schedule-viewer-445107.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}

4. Fill `PUBLIC_CALENDAR_ID` on `index.js` with public google calendar which you want to get intervals from
5. Fill `START_TIME` and `END_TIME` respectively
6. run `node .` and check results in terminal