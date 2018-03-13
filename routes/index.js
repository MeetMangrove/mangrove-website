var express = require('express');
var wording = require('../middleware/wording.js');
var people = require('../middleware/people.js');
var moods = require('../middleware/moods.js');
var thanks = require('../middleware/thanks.js');
var updateLocations = require('../tasks/updateLocations.js').updateLocations;
const { REDIS_URL } = require('../lib/constants');
var redis = require('redis').createClient(REDIS_URL);

import { formatAddress } from '../middleware/map';

var router = express.Router();

router.use(wording);

router.get('/:name?', function(req, res, next) {
  var name = req.params.name;
  name = name || 'index';

  if (name === 'team') {
    if (req.session.user) {
      // private Team page, for members only
      return res.render('team_private', req.wording);
    }

    // Chain promise
    Promise.all([people.get(), moods.get(), thanks.get()]).then(function(
      values
    ) {
      var persons = values[0];
      var moods = values[1];
      var thanks = values[2];
      console.log(thanks.thanks);

      var result = req.wording;
      result.friends = persons.friends;
      result.members = persons.members.sort(function(a, b) {
        return b.lastDone - a.lastDone;
      });
      result.moods = moods;
      result.thanks = thanks.thanks.length;

      redis.get('team.locations', function(err, reply) {
        if (reply) {
          result.coords = JSON.parse(reply);
        } else {
          // if we find nothing in redis, return empty array
          // and asynchronuously run updateLocations
          result.coords = [];
          updateLocations();
        }

        res.render(name, result);
      });
    });
  } else {
    // Just render using wording
    res.render(name.replace(/\W/g, '_'), req.wording);
  }
});

module.exports = router;
