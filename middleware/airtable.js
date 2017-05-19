require('dotenv').config()

var Airtable = require('airtable')
var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE_KEY)

module.exports = {
	members: base('Members')
}
