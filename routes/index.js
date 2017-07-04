var express = require('express')
var wording = require('../middleware/wording.js')
var people = require('../middleware/people.js')

import { formatAddress } from '../middleware/map'

var router = express.Router()

router.use(wording)

router.get('/:name?', function (req, res, next) {
  var name = req.params.name
  name = name || 'index'

  if (name === 'team') {
    // Append people
    people.get()
      .then(
        function (persons) {
          var result = req.wording
          result.friends = persons.friends
          result.members = persons.members
          formatAddress(persons.locations)
            .then(
              function (coords) {
                console.log(coords)
                result.coords = coords
                res.render(name, result)
              },
              function (err) {
                next(err)
              })
        },
        function (err) {
          next(err)
        })
  } else {
    // Just render using wording
    res.render(name, req.wording)
  }
})

module.exports = router
