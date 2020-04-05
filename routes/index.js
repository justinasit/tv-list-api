import authController from '../controllers/auth.controller';
import showsController from '../controllers/shows.controller';

var express = require('express');
var router = express.Router();
const auth = require("../middleware/auth");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Shows routes */
router.get('/stored-shows', auth, async (req, res) => showsController.index(req, res));
router.get('/archived-shows', auth, async (req, res) => showsController.archived(req, res));
router.post('/stored-shows', auth, async (req, res) => showsController.store(req, res));

/* Auth routes */
router.get("/current", auth, async (req, res) => authController.current(req, res));
router.post("/user", async (req, res) => authController.register(req, res));
router.post("/login", async (req, res) => authController.login(req, res));

module.exports = router;

