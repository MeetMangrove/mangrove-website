const {AIRTABLE_API_KEY, AIRTABLE_BASE_KEY} = require('../lib/constants')

var Airtable = require('airtable')
var base = new Airtable({apiKey: AIRTABLE_API_KEY}).base(AIRTABLE_BASE_KEY)

module.exports = {
  members: base('Members')
}
