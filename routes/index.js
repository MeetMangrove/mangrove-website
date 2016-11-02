var express = require('express');
var wording = require('../middleware/wording.js')

var router = express.Router();
router.use(wording);

router.get('/:name?', function(req, res, next) {
	var name = req.params.name
	name = (name) ? name : 'index'
	res.render(name, req.wording)
});

module.exports = router;
