var express = require('express');
var wording = require('../middleware/wording.js')
var friends = require('../middleware/friends.js')
var router = express.Router();
router.use(wording);

router.get('/:name?', function(req, res, next) {
	var name = req.params.name
	name = name ? name : 'index'

	if (name === 'team') {
		// Append friends
		friends.get().
			then(
				function (friends) {
					var result = req.wording
					result.friends = friends
					res.render(name, result)
				},
				function (err) {
					next(err)
				}
			)
	} else {
		// Just render using wording
		res.render(name, req.wording)
	}
});

module.exports = router;
