const express = require('express');
const router = express.Router();
const Hero = require('../models/hero');

// Index
router.get('/', (req, res, next) => {
  const query = {};
  if(req.query.name) query.name = { $regex: req.query.name, $options: 'i'};

  Hero.find(query)
    .sort({id: 1})
    .exec((err, heroes) => {
      if(err) {
        res.status(500);
        res.json({ sucess: false, message: err });
      } else {
        res.json({ sucess: true, data: heroes });
      }
    });
});

// Show
router.get('/:id', (req, res, next) => {
  Hero.findOne({ id: req.params.id })
    .exec((err, hero) => {
      if(err) {
        res.status(500);
        res.json({ sucess: false, message: err });
      } else {
        res.json({ sucess: true, data: hero });
      }
    });
});

// Create
router.post('/', 
  (req, res, next) => {
    Hero.findOne({})
      .sort({ id: -1 })
      .exec((err, hero) => {
        if(err) {
          res.status(500);
          res.json({ sucess: false, message: err });
        } else {
          res.locals.lastId = hero ? hero.id : 0;
          next();
        }
      });
  }, 
  (req, res, next) => {
    const newHero = new Hero(req.body);
    newHero.id = res.locals.lastId + 1;
    newHero.save((err, hero) => {
      if(err) {
        res.status(500);
        res.json({ success: false, message: err });
      } else {
        res.json({ success: true, data: hero });
      }
    });
  }
);

// Update
router.put('/:id', (req, res, next) => {
  Hero.findOneAndUpdate({ id: req.params.id }, req.body)
    .exec((err, hero) => {
      if(err) {
        res.status(500);
        res.json({ success: false, message: err });
      } else if(!hero) {
        res.json({ success: false, message: 'hero not found' });
      } else {
        res.json({ success: true });
      }
    });
});

// Destroy
router.delete('/:id', (req, res, next) => {
  Hero.findOneAndRemove({ id: req.params.id })
    .exec((err, hero) => {
      if(err) {
        res.status(500);
        res.json({ success: false, message: err });
      } else if(!hero) {
        res.json({ success: false, message: 'hero not found' });
      } else {
        res.json({ success: true });
      }
    });
});

module.exports = router;