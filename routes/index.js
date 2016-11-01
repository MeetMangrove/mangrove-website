var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Mangrove - Homepage',
    catchphrase: 'From Work to Line',
    description: 'bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla blabla bla bla bla bla'
    sections: [
      {
        title: 'Work differently.',
        text: 'bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla',
        cta: { link: 'http://google.com', text: 'Read our manifesto' },
        background: 'images/fish.jpg'
      },
      {
        title: 'Work differently.',
        text: 'bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla',
        cta: { link: 'http://google.com', text: 'Read our manifesto' },
        background: 'images/fish.jpg'
      },
      {
        title: 'Work differently.',
        text: 'bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla',
        cta: { link: 'http://google.com', text: 'Read our manifesto' },
        background: 'images/fish.jpg'
      }
    ]
  });
});

module.exports = router;
