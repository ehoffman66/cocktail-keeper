const fs = require('fs');
const path = require('path');
const credentials = JSON.parse(fs.readFileSync(path.join(__dirname, '../../creds.json'), 'utf-8'));

const {GoogleAuth} = require('google-auth-library');
const {google} = require('googleapis');

const auth = new GoogleAuth({
  credentials,
  scopes: 'https://www.googleapis.com/auth/spreadsheets',
});

async function getValues(spreadsheetId, range) {

  const auth = new GoogleAuth({
    credentials,
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
  });

  const service = google.sheets({ version: 'v4', auth });

  try {
    const response = await service.spreadsheets.values.get({
      spreadsheetId,
      range: 'recipes',
    });

    // Access the 2D array from the response
    const result = response.data ? response.data.values : [];

    // Separate the headers from the data
    const headers = result[0];
    const rows = result.slice(1);

    // Map each row to an object with properties named after the headers
    const json = rows.map(row => {
      let obj = {};
      headers.forEach((header, i) => {
        obj[header] = row[i];
      });
      return obj;
    });

    console.log(json);

    return json;
  } catch (err) {
    // Log the error
    console.error(err);
    throw err;
  }
}

module.exports = { getValues };