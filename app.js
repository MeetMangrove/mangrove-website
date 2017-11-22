import 'babel-polyfill'

var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var bodyParser = require('body-parser')
var cookieSession = require('cookie-session')
var sassMiddleware = require('node-sass-middleware')
var passport = require('./lib/passport')
var constants = require('./lib/constants')

var routes = require('./routes')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieSession({
  name: 'mangrove-website',
  keys: [constants.SECRET],
  maxAge: 30 * 24 * 3600 * 1000 // 30 days
}))
// SASS assets
app.use(sassMiddleware({
  src: constants.ASSETS_DIR,
  dest: constants.TEMP_DIR,
  debug: true,
  outputStyle: (app.get('env') === 'development' ? 'extended' : 'compressed'),
  prefix: '/', // prefix for asset URLs <link rel=":prefix/asset.css">
  log: function (severity, key, value) {
    console.log('%s node-sass-middleware %s : %s', severity, key, value);
  },
  error: function (err) {
    console.log('ERROR node-sass-middleware', err)
  }
}))
// serve compiled assets from the temp directory
app.use(express.static(constants.TEMP_DIR))
// serve public files from the public directory
app.use(express.static(constants.PUBLIC_DIR))

// login with slack
app.use(passport.initialize())
app.use(function(req, res, next) {
  res.locals.session = (req.session || {})
  next()
})
app.get('/login', function(req, res) {
  res.redirect('/auth/slack')
})
app.get('/logout', function(req, res) {
  req.session.user = null
  res.redirect('/')
})
app.get('/auth/slack', passport.authorize('slack'))
app.get('/auth/slack/callback',
  passport.authorize('slack', {failureRedirect: '/'}),
  function(req, res, next) {
    if (req.account) {
      // check that the user signed in with one of our Slack teams
      if (constants.SLACK_TEAM_IDS.indexOf(req.account.team.id) >= 0) {
        // user is signed in - save to session
        req.session.user = req.account.user
        req.session.team = req.account.team
        return res.redirect('/team')
      }
    }
    // do not sign in: wrong slack team
    req.session.user = null
    req.session.team = null
    // TODO: needs proper error page
    res.redirect("/?error=invalid_slack_team")
  }
)

// all routes
app.use('/', routes)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
