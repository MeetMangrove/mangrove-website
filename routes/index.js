var express = require('express');
var wording = require('../middleware/wording.js')

var router = express.Router();
router.use(wording);

router.get('/', function(req, res, next) {
  res.render('index', req.wording)
});

router.get('/values', function(req, res, next) {
  res.render('values', req.wording)
});

router.get('/lifestyle', function(req, res, next) {
  res.render('lifestyle', req.wording)
});

router.get('/community', function(req, res, next) {
  res.render('community', req.wording)
});

router.get('/team', function(req, res, next) {
  res.render('team', req.wording)
});

module.exports = router;
