var google = require('googleapis')
var auth = require('./auth.js')

/**
Get people from the Mangrove Friends spreadsheet
*/
function getPeople() {
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
				var result = peopleFilledWithGenericInfos(rows)

				// Fill with points
				getPoints().
					then(
						function (points) {
							result = appendPointsToPeople(result, points)
							resolve(result)
						},
						function (err) {
							reject(err)
						}
					)
			})
		})
	})
}

/**
Create arrays of members and friends with infos found in the Mangrove Friends spreadsheet
*/
function peopleFilledWithGenericInfos(rows) {
	var friends = []
	var members = []
	for (var i = 0; i < rows.length; i++) {
		var row = rows[i]
		if (row.length !== 0) {
			var person = {
				first_name: row[0],
				last_name: row[1],
				twitter: row[2],
				image: row[3]
			}
			if (row[4] == 1) { // member
				members.push(person)
			} else if (row[4] == 0) { // friend
				friends.push(person)
			}
		}
	}
	return {
		friends: friends,
		members: members
	}
}

/**
Get contributions points from the contributions points spreadsheet
*/
function getPoints() {
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
				spreadsheetId: '1R62yph7F8kuhE5YFW0f31Nb5eSCXHX1KBED-recRbVk',
				range: 'total!A2:B'
			}, function(err, response) {
				// Error handler
				if (err) {
					reject(err)
					return
				}

				// Return points
				var points = response.values
				resolve(points)
			})
		})
	})
}

/**
Add points to members
*/
function appendPointsToPeople(people, points) {
	// Get members
	var members = people.members

	// Add points
	for (var i = 0; i < members.length; i++) {
		var member = members[i]
		for (var j=0; j < points.length; j++) {
			var point = points[j]
			var firstName = point[0]
			if (member.first_name == firstName) {
				members[i].points = point[1]
			}
		}
	}

	// Return people
	people.members = members
	return people
}

module.exports = {
	get: getPeople
}
