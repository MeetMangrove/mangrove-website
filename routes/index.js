var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Mangrove',
    catchphrase: 'From Work to Life.',
    cta: 'Start a new life. Join us now',
    description: 'bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla blabla bla bla bla bla',
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

router.get('/values', function(req, res, next) {
  res.render('values', {
    title: 'Mangrove',
    catchphrase: 'From Work to Life.',
    cta: 'Start a new life. Join us now',
    description: 'bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla blabla bla bla bla bla',
  })
});

router.get('/community', function(req, res, next) {
  res.render('community', {
    title: 'Mangrove',
    catchphrase: 'Our community is our strength',
    cta: 'Start a new life. Join us now',
    description: 'bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla blabla bla bla bla bla',
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
    ]  })
});

router.get('/lifestyle', function(req, res, next) {
  res.render('lifestyle', {
    title: 'Mangrove',
    catchphrase: 'Hubs, Retreats & Bootcamps.',
    cta: 'Start a new life. Join us now',
    description: 'bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla blabla bla bla bla bla',
    sections: [
      {
        title: 'Remote work & hub',
        text: 'bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla',
        detail: 'bla bla blab',
        image: 'images/fish.jpg'
      },
      {
        title: 'Work differently.',
        text: 'bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla',
        detail: 'bla bla blab',
        image: 'images/fish.jpg'
      },
      {
        title: 'Work differently.',
        text: 'bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla',
        detail: 'bla bla blab',
        image: 'images/fish.jpg'
      }
    ]
  })
});

router.get('/team', function(req, res, next) {
  res.render('values', {
    title: 'Mangrove',
    catchphrase: 'Co-founders and friends',
    cta: 'Start a new life. Join us now',
    description: 'bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla blabla bla bla bla bla',
  })
});

module.exports = router;
