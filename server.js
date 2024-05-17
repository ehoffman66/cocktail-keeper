const express = require('express');
const { getValues } = require('./src/utils/getValues.js'); // Assuming getValues is in the same directory

const app = express();
const port = 3000;

app.get('/readSheet', async (req, res) => {
  const spreadsheetId = '1dMklaBUmd7j4dD5Ufdc0BehDZ4UcwPiUaXh-L906XoM'; // Replace with your Spreadsheet ID
  const range = 'recipes!A1:C3'; // Replace with your range

  try {
    const result = await getValues(spreadsheetId, range);
    res.json(result);
  } catch (err) {
    console.error(err); // Log the error to the console
    res.status(500).send('Error reading from Google Sheets');
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});