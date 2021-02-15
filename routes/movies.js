const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  addMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movies');

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(/https?:\/\/w{0,3}[a-z0-9-._~:/?#[\]@!$&'()*+,;=]*#?/),
    trailer: Joi.string().required().pattern(/https?:\/\/w{0,3}[a-z0-9-._~:/?#[\]@!$&'()*+,;=]*#?/),
    thumbnail: Joi.string().required().pattern(/https?:\/\/w{0,3}[a-z0-9-._~:/?#[\]@!$&'()*+,;=]*#?/),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), addMovie);

router.get('/', getMovies);
router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
}), deleteMovie);

module.exports = router;
