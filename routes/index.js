import authController from '../controllers/auth.controller';
import showsController from '../controllers/shows.controller';
import express from  'express';
import auth from '../middleware/auth';

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Shows routes */
router.get('/stored-shows', auth, async (req, res) => showsController.index(req, res));
router.get('/archived-shows', auth, async (req, res) => showsController.archived(req, res));
router.post('/stored-shows', auth, async (req, res) => showsController.store(req, res));
router.post('/archived-shows', auth, async (req, res) => showsController.storeArchived(req, res));

/* Auth routes */
router.get("/current", auth, async (req, res) => authController.current(req, res));
router.post("/user", async (req, res) => authController.register(req, res));
router.post("/login", async (req, res) => authController.login(req, res));

export default router;

