const router = require('express').Router();
const signup = require('./signUp');
const signin = require('./signIn');
const users = require('./users');
const movies = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found-err');

router.use('/signup', signup);
router.use('/signin', signin);
router.use(auth);
router.use('/users', users);
router.use('/movies', movies);
router.use(() => {
  throw new NotFoundError('Запрашиваемый ресурс не найден.');
});

module.exports = router;
