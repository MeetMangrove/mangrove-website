var google = require('googleapis')
var auth = require('./auth.js')

/*var drive = google.drive('v3')
drive.files.list({
	auth: auth
}, function (err, resp) {
	console.log(err)
})*/

var pages = {
	home: {
		ranges: ['Main!A2:E', 'Home!A2:D'],
		index: 0
	},
	values: {
		ranges: ['Main!A2:E', 'Values!A2:E'],
		index: 1
	},
	lifestyle: {
		ranges: ['Main!A2:E', 'Lifestyle!A2:C'],
		index: 2
	},
	community: {
		ranges: ['Main!A2:E', 'Community!A2:C'],
		index: 3
	},
	team: {
		ranges: ['Main!A2:E'],
		index: 4
	}
}

/**
Get the wording for the page named 'name'
*/
function getWording(name) {
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
				reject('Page name does not exists. Possible values are : home, values, lifestyle, community, team')
				return
			}

			var sheets = google.sheets('v4')
			sheets.spreadsheets.values.batchGet({
				auth: auth,
				spreadsheetId: '1eCOYdNHmHyPEktZbQP5D6vbQtCbGRs059NyoL26XzXI',
				ranges: page.ranges
			}, function(err, response) {
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
					title: row[1],
					catchphrase: row[2],
					cta: row[3],
					description: row[4]
				}

				if (name != 'team') {
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
					case 'values': // Values
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
					case 'lifestyle': // Lifestyle
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
					case 'community': // Community
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
	path = (path == '') ? 'home' : path
	getWording(path).
		then(
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
