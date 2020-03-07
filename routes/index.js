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
router.get('/stored-shows', auth, async function(req, res, next) {
  const user = await mongoose.model('User').findById(req.user._id).select('shows');

  return res.send(user.shows);
});

/* GET archived shows. */
router.get('/archived-shows', auth, async function(req, res, next) {
  const user = await mongoose.model('User').findById(req.user._id).select('archivedShows');

  return res.send(user.archivedShows);
});

/* Auth routes */
router.get("/current", auth, async (req, res) => authController.current(req, res));
router.post("/user", async (req, res) => authController.register(req, res));
router.post("/login", async (req, res) => authController.login(req, res));

module.exports = router;

