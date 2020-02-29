import mongoose from 'mongoose';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET shows. */
router.get('/stored-shows', async function(req, res, next) {
  const shows = await mongoose.model('Show').find({});

  return res.send(shows);
});

/* GET archived shows. */
router.get('/archived-shows', async function(req, res, next) {
  const shows = await mongoose.model('ArchivedShow').find({});
  console.log(shows);

  return res.send(shows);
});

module.exports = router;
