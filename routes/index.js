import mongoose from 'mongoose';
import authController from '../controllers/auth.controller';

var express = require('express');
var router = express.Router();
const auth = require("../middleware/auth");

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

  return res.send(shows);
});

/* Auth routes */
router.get("/current", auth, async (req, res) => authController.current(req, res));
router.post("/user", async (req, res) => authController.register(req, res));
router.post("/login", async (req, res) => authController.login(req, res));

module.exports = router;

