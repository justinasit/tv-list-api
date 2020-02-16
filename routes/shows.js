import mongoose from 'mongoose';

var express = require('express');
var router = express.Router();

router.get('/', async function(req, res, next) {
  const shows = await mongoose.model('Show').find({});

  return res.send(shows);
});

module.exports = router;
