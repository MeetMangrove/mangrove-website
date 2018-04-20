var express = require("express");
var people = require("../middleware/people.js");
var moods = require("../middleware/moods.js");
var thanks = require("../middleware/thanks.js");
const retreats = require("../middleware/retreats.js");
const participants = require("../middleware/participants.js");
var updateLocations = require("../tasks/updateLocations.js").updateLocations;
const { REDIS_URL } = require("../lib/constants");
var redis = require("redis").createClient(REDIS_URL);
var router = express.Router();

router.get("/:name?", function(req, res, next) {
  var name = req.params.name;
  name = name || "index";
  const title = {
    index: "Mangrove",
    lifestyle: "Lifestyle | Mangrove",
    "mutual-help": "Mutual Help | Mangrove",
    retreats: "Retreats | Mangrove",
    team: "Team | Mangrove",
    about: "About | Mangrove",
  }[name];

  if (name === "team") {
    if (req.session.user) {
      // private Team page, for members only
      return res.render("team_private");
    }

    // Chain promise
    Promise.all([people.get(), moods.get(), thanks.get()]).then(function (values) {
      var persons = values[0];
      var moods = values[1];
      var thanks = values[2];
      console.log(thanks.thanks);

      var result = {};
      result.friends = persons.friends;
      result.members = persons.members.sort(function (a, b) {
        return b.lastDone - a.lastDone;
      });
      result.moods = moods;
      result.thanks = thanks.thanks.length;

      redis.get("team.locations", function (err, reply) {
        if (reply) {
          result.coords = JSON.parse(reply);
        } else {
          // if we find nothing in redis, return empty array
          // and asynchronuously run updateLocations
          result.coords = [];
          updateLocations();
        }

        res.render(name, { ...result, title });
      });
    });
  } else if (name === "retreats") {
    // Chain promise
    Promise.all([retreats.get(), participants.get()]).then(function ([retreats, participants]) {
      retreats.forEach((retreat) => {
        retreat.participants = [];
        participants.forEach((participant) => {
          if (participant['Retreat Id'][0] === retreat.id) {
            retreat.participants.push({
              image: participant['Participant Image'][0].url,
              twitter: participant['Twitter']
            });
          }
        });
      });
      res.render(name, { retreats, title });
    });
  } else {
    // Just render using wording
    res.render(name.replace(/\W/g, "_"), { title });
  }
});

module.exports = router;
