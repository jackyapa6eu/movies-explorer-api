const Movie = require('../models/movie');
const NotFoundError = require('../errors/not-found-err');
const BadRequest = require('../errors/bad-request');

module.exports.addMovie = (req, res, next) => {
  const newMovie = req.body;
  newMovie.owner = req.user._id;
  Movie.create(newMovie)
    .then((movie) => res.send({ data: movie }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        throw new BadRequest(error.message);
      } else {
        next(error);
      }
    })
    .catch(next);
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      if (!movies) {
        throw new NotFoundError('Movies not found.');
      }
      res.send({ data: movies });
    })
    .catch((error) => {
      next(error);
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId).select('+owner')
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Movie not found');
      } else if (movie.owner.toString() === req.user._id) {
        Movie.findByIdAndRemove(req.params.movieId)
          .then((movieForDelete) => {
            if (!movieForDelete) {
              throw new NotFoundError('Movie not found');
            }
            res.send({ data: movieForDelete });
          })
          .catch(next);
      } else {
        throw new BadRequest('This movie not yours.');
      }
    })
    .catch(next);
};
