var airtable = require("./airtable.js");

function getPeople() {
  return new Promise(function(resolve, reject) {
    var members = [],
      friends = [],
      locations = [];

    airtable.members
      .select({
        // filterByFormula: "{Status} = 'Cofounder'",
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(function(record) {
            var status = record.get("Status");
            if (
              status === "Builder" ||
              status === "Resident" ||
              status === "Veteran"
            ) {
              members.push(record);
            } else if (status === "Friend" || status === "Guest") {
              friends.push(record);
            }
            locations.push(record.get("Current Location"));
          });
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            reject(err);
            return;
          }

          members = sortMembers(members);
          members = formatMembers(members);
          friends = formatFriends(friends);

          console.log("=> Retrieved " + members.length + " members.");
          console.log("=> Retrieved " + friends.length + " friends.");

          resolve({
            members: members,
            friends: friends,
            locations: locations
          });
        }
      );
  });
}

function formatFriends(records) {
  var friends = [];

  for (var i = 0; i < records.length; i++) {
    var record = records[i];
    var tw =
      record.get("Twitter") && record.get("Twitter").length
        ? record.get("Twitter")
        : null;
    var img =
      record.get("Profile Picture") && record.get("Profile Picture").length
        ? record.get("Profile Picture")[0].url
        : null;
    var person = {
      name: record.get("Name"),
      twitter: tw,
      image: img
    };

    friends.push(person);
  }

  return friends;
}

function formatMembers(records) {
  var members = [];

  var threeMonthAgo = new Date();
  threeMonthAgo.setMonth(threeMonthAgo.getMonth() - 3);

  for (var i = 0; i < records.length; i++) {
    var record = records[i];

    var tw =
      record.get("Twitter") && record.get("Twitter").length
        ? record.get("Twitter")
        : null;
    var img =
      record.get("Profile Picture") && record.get("Profile Picture").length
        ? record.get("Profile Picture")[0].url
        : null;
    var dateOfArrival = new Date(record.get("Member Since"));
    var location = record.get("Location");

    var person = {
      name: record.get("Name"),
      twitter: tw,
      image: img,
      dateOfArrival: formatArrivalDate(dateOfArrival),
      tracks: record.get("Tracks") ? record.get("Tracks") : [],
      fire: i < 3,
      newbie: dateOfArrival > threeMonthAgo,
      skills: record.get("Skills"),
      bio: truncateText(record.get("Bio"), 100),
      bioFull: record.get("Bio"),
      location: location ? location.replace(/,.*/, "") : null
    };

    members.push(person);
  }

  return members;
}

function truncateText(str, length, ending) {
  if (str) {
    if (length == null) {
      length = 100;
    }
    if (ending == null) {
      ending = "...";
    }
    if (str.length > length) {
      return str.substring(0, length - ending.length) + ending;
    } else {
      return str;
    }
  }
}

function sortMembers(members) {
  members.sort(function(a, b) {
    return b.get("Last Month Points") - a.get("Last Month Points");
  });

  return members;
}

function formatArrivalDate(date) {
  var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  return monthNames[date.getMonth()] + " " + date.getFullYear();
}

module.exports = {
  get: getPeople
};
