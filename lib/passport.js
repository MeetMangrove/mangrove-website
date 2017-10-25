var constants = require('./constants')
var SlackStrategy = require('passport-slack').Strategy
var passport = require('passport')

// setup the strategy using defaults
passport.use(new SlackStrategy({
  clientID: constants.SLACK_CLIENT_ID,
  clientSecret: constants.SLACK_CLIENT_SECRET,
  callbackURL: "/auth/slack/callback",
  team: constants.SLACK_TEAM_NAMES[0],
}, (accessToken, refreshToken, profile, done) => {
  // optionally persist profile data
  done(null, profile)
}))

module.exports = passport
