require('dotenv').config()

var AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
var AIRTABLE_BASE_KEY = process.env.AIRTABLE_BASE_KEY

if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_KEY) {
  console.log('Error: Specify AIRTABLE_API_KEY and AIRTABLE_BASE_KEY in a .env file')
  process.exit(1)
}
var Airtable = require('airtable')
var base = new Airtable({apiKey: AIRTABLE_API_KEY}).base(AIRTABLE_BASE_KEY)

module.exports = {
  members: base('Members'),
  moods: base('Moods')
}
