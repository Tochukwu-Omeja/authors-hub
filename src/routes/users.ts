import express from 'express';
import { signup, login, logout } from '../controllers/user';
// import { myController } from '../controllers/book';
const router = express.Router();

/* GET users listing. */
// router.get('/', myController);

// router.post('/', signup);
router.post('/signup', signup);
router.get('/signup', signup);
router.post('/login', login);
router.get('/login', login);
router.get('/logout', logout);

export default router;
