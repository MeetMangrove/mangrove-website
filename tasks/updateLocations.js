import people from '../middleware/people'
import {formatAddress} from '../middleware/map'
var redis = require('redis').createClient(process.env.REDIS_URL)

var updateLocations = function() {
	return new Promise(function (resolve, reject) {
		console.log('Updating team locations')
		people.get().then(
			function(persons) {
				formatAddress(persons.locations).then(
					function(coords) {
						redis.set(
							'team.locations',
							JSON.stringify(coords),
							console.log('Done updating team locations')
						)
						resolve(coords)
					},
					function(err) {
						console.log(err)
						reject(err)
					}
				)
			},
			function(err) {
				console.log(err)
				reject(err)
			}
		)
	})
}

module.exports = {
	updateLocations: updateLocations
}

// if executed as a script, run the function
if (require.main === module) {
	updateLocations().then(function() {
		process.exit(0)
	})
}