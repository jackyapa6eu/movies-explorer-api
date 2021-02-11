const router = require('express').Router();
const signup = require('./signUp');
const signin = require('./signIn');
const users = require('./users');
const movies = require('./movies');
const auth = require('../middlewares/auth');

router.use('/signup', signup);
router.use('/signin', signin);
router.use('/users', auth, users);
router.use('/movies', auth, movies);

module.exports = router;
