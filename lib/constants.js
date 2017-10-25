var env = {
  // returns env[key], throwing an error if missing or blank
  req: function(key) {
    var value = process.env[key]
    if (!value || !value.length) throw new Error("missing env variable " + key)
    return value
  }
}

module.exports = {
  // secret key used to protect cookies and login
  SECRET: env.req('SECRET'),
  // Slack app credentials
  SLACK_CLIENT_ID: env.req('SLACK_CLIENT_ID'),
  SLACK_CLIENT_SECRET: env.req('SLACK_CLIENT_SECRET'),
  // comma-separated names of Slack teams allowed for login
  SLACK_TEAM_NAMES: env.req('SLACK_TEAM_NAMES').split(',')
}
