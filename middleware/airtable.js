var Airtable = require('airtable')
var base = new Airtable({apiKey: 'keyqnZFJLYUXSgo93'}).base('appHUSN6KmmkMAgV7')

module.exports = {
	members: base('Members')
}
