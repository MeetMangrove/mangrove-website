var google = require('googleapis')
var auth = require('./auth.js')

function getPeople() {
	return new Promise(function (resolve, reject) {
		var result = {}

		getMembers().then(
			function(members) {
				result['members'] = members

				getFriends().then(
					function(friends) {
						result['friends'] = friends

						resolve(result)
					}
				)
			},

			function(error) {
				reject(error)
			}
		)
	})
}

/**
Get people from the Mangrove Friends spreadsheet
*/
function getFriends() {
	return new Promise(function (resolve, reject) {
		// Make auth
		auth.authorize(function (err, tokens) {
			// Auth error
			if (err) {
				reject(err)
				return
			}

			var sheets = google.sheets('v4')
			sheets.spreadsheets.values.get({
				auth: auth,
				spreadsheetId: '1ksK3vR4XF60SnegkSAjV3Q8SYHh-dgGUJDA4Y9RTBRE',
				range: 'WebsiteV2!A2:E'
			}, function(err, response) {
				// Error handler
				if (err) {
					reject(err)
					return
				}

				// Fill with generic infos
				var rows = response.values
				var friends = formatFriends(rows)
				resolve(friends)
			})
		})
	})
}


function getMembers() {
	return new Promise(function (resolve, reject) {
		// Make auth
		auth.authorize(function (err, tokens) {
			// Auth error
			if (err) {
				reject(err)
				return
			}

			var sheets = google.sheets('v4')
			sheets.spreadsheets.values.get({
				auth: auth,
				spreadsheetId: '1_gpj4hH3NgaDdpzav1wUqIxTU-6-otSvqxccgwX-5aQ',
				range: 'Members!A2:H'
			}, function(err, response) {
				// Error handler
				if (err) {
					reject(err)
					return
				}

				// Fill with generic infos
				var rows = response.values
				var members = formatMembers(rows)
				members = orderMembers(members)
				resolve(members)
			})
		})
	})
}

function orderMembers(members) {
	members.sort(function(a, b) {
		return a.rank - b.rank
	})

	return members
}
function formatMembers(rows) {
	var members = []
	var threeMonthAgo = new Date()
	threeMonthAgo.setMonth(threeMonthAgo.getMonth()-3)

	for (var i = 0; i < rows.length; i++) {
		var row = rows[i]

		if (row.length !== 0) {
			var tw = row[2] && row[2].length ? row[2] : null;
			var img = tw ? 'https://twitter.com/' + tw + '/profile_image?size=original' : row[3];
			var dateOfArrival = new Date(row[3])

			var person = {
				firstName: row[0],
				lastName: row[1],
				twitter: tw,
				image: img,
				dateOfArrival: formatArrivalDate(dateOfArrival),
				points: row[4],
				rank: row[5],
				currentCity: row[6],
				tracks: row[7].split(', '),
				fire: (row[5] < 4),
				newbie: (dateOfArrival > threeMonthAgo)
			}

			members.push(person)
		}
	}
	console.log(members)

	return members
}

function formatArrivalDate(date) {
	var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

	return 'since ' + monthNames[date.getMonth()] + ' ' + date.getFullYear()
}
/**
Create arrays of members and friends with infos found in the Mangrove Friends spreadsheet
*/
function formatFriends(rows) {
	var friends = []

	for (var i = 0; i < rows.length; i++) {
		var row = rows[i]
		if (row.length !== 0) {
			var tw = row[2] && row[2].length ? row[2] : null;
			var img = tw ? 'https://twitter.com/' + tw + '/profile_image?size=original' : row[3];
			var person = {
				first_name: row[0],
				last_name: row[1],
				twitter: tw,
				image: img
			}
			if (row[4] == 0) { // friend
				friends.push(person)
			}
		}
	}

	return friends
}

module.exports = {
	get: getPeople
}
