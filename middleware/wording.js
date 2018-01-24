/* eslint-disable no-redeclare,prefer-promise-reject-errors */
var google = require('googleapis')
var auth = require('./auth.js')

// Redis cache init
var {REDIS_URL}  = require('../lib/constants')
var cacheManager = require('cache-manager');
var redisStore   = require('cache-manager-redis');
var cache        = cacheManager.caching({
  store: redisStore,
  url: REDIS_URL,
  db: 0,
  ttl: 3600
});
var ttl = 3600; // in seconds

// Google Drive File Listing
/*
var drive = google.drive('v3')
 drive.files.list({
 auth: auth
 }, function (err, resp) {
 console.log(err)
 })
*/

var pages = {
  home: {
    ranges: ['Main!A2:E', 'Home!A2:D'],
    index: 0
  },
  about: {
    ranges: ['Main!A2:E', 'About!A2:E'],
    index: 1
  },
  lifestyle: {
    ranges: ['Main!A2:E', 'Lifestyle!A2:C'],
    index: 2
  },
  team: {
    ranges: ['Main!A2:E'],
    index: 4
  },
  'mutual-help': {
    ranges: ['Main!A2:E', 'MutualHelp!A2:B'],
    index: 5
  }
}

/**
 Get the wording for the page named 'name'
 */
function getWording (name) {
  return new Promise(function (resolve, reject) {
    // Make auth
    auth.authorize(function (err, tokens) {
      // Auth error
      if (err) {
        reject(err)
        return
      }

      // Get page
      var page = pages[name]
      if (!page) {
        reject('Page name does not exists. Possible values are : home, values, projects, community, team')
        return
      }

      var sheets = google.sheets('v4')
      sheets.spreadsheets.values.batchGet({
        auth: auth,
        spreadsheetId: '1eCOYdNHmHyPEktZbQP5D6vbQtCbGRs059NyoL26XzXI',
        ranges: page.ranges
      }, function (err, response) {
        // Error handler
        if (err) {
          reject(err)
          return
        }

        // Fill generic info
        var tabs = response.valueRanges
        var rows = tabs[0].values
        var row = rows[page.index]
        var wording = {
          name: name,
          title: row[1],
          catchphrase: row[2],
          cta: row[3],
          description: row[4]
        }

        if (name !== 'team') {
          // Fill page specific information
          rows = tabs[1].values

          switch (name) {
            case 'home': // Home
              wording.sections = []
              for (var j = 0; j < rows.length; j++) {
                var row = rows[j]
                var section = {
                  title: row[0],
                  text: row[1],
                  cta: row[2],
                  cta_link: row[3]
                }
                wording.sections.push(section)
              }
              break
            case 'about': // Values
              var row = rows[0]
              var section = {
                title: row[0],
                text: row[1],
                cta: row[2],
                cta_link: row[3]
              }
              wording.section = section
              wording.manifesto = row[4]
              break
            case 'lifestyle': // Community
              wording.sections = []
              for (var j = 0; j < rows.length; j++) {
                var row = rows[j]
                var section = {
                  title: row[0],
                  text: row[1],
                  image_detail: row[2]
                }
                wording.sections.push(section)
              }
              break
            case 'mutual-help': // Projects
              wording.sections = []
              for (var j = 0; j < rows.length; j++) {
                var row = rows[j]
                var section = {
                  title: row[0],
                  text: row[1]
                }
                wording.sections.push(section)
              }
              break
            default:
              break
          }
        }
        resolve(wording)
      })
    })
  })
}

var wordingMiddleware = function (req, res, next) {
  var path = req.path.substring(1)
  path = (path === '') ? 'home' : path

  // Wrap the getWording call with Redis cache
  var key = 'page_' + path;
  cache.wrap(key, function() {
    return getWording(path, res)
  }, {ttl: ttl})
  .then(
    function (wording) {
      req.wording = wording
      next()
    },
    function (err) {
      next(err)
    }
  )
}

module.exports = wordingMiddleware
