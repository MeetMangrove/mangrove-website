var express = require('express')
var wording = require('../middleware/wording.js')
var people = require('../middleware/people.js')
var updateLocations = require('../tasks/updateLocations.js').updateLocations
var redis = require('redis').createClient(process.env.REDIS_URL)

import { formatAddress } from '../middleware/map'

var router = express.Router()

router.use(wording)

router.get('/:name?', function (req, res, next) {
  var name = req.params.name
  name = name || 'index'

  if (name === 'team') {
    if (req.session.user) {
      // private Team page, for members only
      return res.render('team_private', req.wording)
    }
    // Append people
    people.get()
      .then(
        function (persons) {
          var result = req.wording
          result.friends = persons.friends
          result.members = persons.members
          redis.get('team.locations', function(err, reply) {
            if (reply) {
              result.coords = JSON.parse(reply)
            } else {
              // if we find nothing in redis, return empty array
              // and asynchronuously run updateLocations
              result.coords = []
              updateLocations()
            }
            res.render(name, result)
          })
        },
        function (err) {
          next(err)
        })
  } else {
    // Just render using wording
    res.render(name.replace(/\W/g, '_'), req.wording)
  }
})

module.exports = router
