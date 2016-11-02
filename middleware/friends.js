var google = require('googleapis');
var auth = require('./auth.js')

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
				range: 'WebsiteV2!A2:D'
			}, function(err, response) {
				// Error handler
				if (err) {
					reject(err)
					return;
				}

				// Fill generic info
				var rows = response.values
				var friends = []
				for (var i = 0; i < rows.length; i++) {
					var row = rows[i]
					if (row.length !== 0) {
						var friend = {
							first_name: row[0],
							last_name: row[1],
							twitter: row[2],
							image: row[3]
						}
						friends.push(friend)
					}
				}

				resolve(friends)
			});
		});
	});
}

module.exports = {
	get: getFriends
}
