var key = require('./client_secret.json')
var google = require('googleapis')

module.exports = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ['https://www.googleapis.com/auth/spreadsheets.readonly', 'https://www.googleapis.com/auth/drive'],
  null
)
