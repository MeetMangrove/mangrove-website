require('dotenv').config()
var path = require('path')

var env = {
  // returns env[key], throwing an error if missing or blank
  req: function(key) {
    var value = process.env[key]
    if (!value || !value.length) throw new Error("missing env variable " + key)
    return value
  },
}

module.exports = {
  // dir with public files
  PUBLIC_DIR: path.join(__dirname, '/../public'),
  // dir with SASS, Coffee assets
  ASSETS_DIR: path.join(__dirname, '/../assets'),
  // dir with temporary files
  TEMP_DIR: path.join(__dirname, '/../tmp'),
  // secret key used to protect cookies and login
  SECRET: env.req('SECRET'),
  // Slack app credentials
  SLACK_CLIENT_ID: env.req('SLACK_CLIENT_ID'),
  SLACK_CLIENT_SECRET: env.req('SLACK_CLIENT_SECRET'),
  // comma-separated IDs of Slack teams allowed for login
  SLACK_TEAM_IDS: env.req('SLACK_TEAM_IDS').split(','),
  // Airtable credentials
  AIRTABLE_API_KEY: env.req('AIRTABLE_API_KEY'),
  AIRTABLE_BASE_KEY: env.req('AIRTABLE_BASE_KEY'),
  // port number for HTTP server (defaults to 3000)
  PORT: (process.env.PORT || '3000'),
  // Redis URL (optional, defaults to localhost)
  REDIS_URL: process.env.REDIS_URL,
  // Google Maps API Key (optional)
  GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
}
