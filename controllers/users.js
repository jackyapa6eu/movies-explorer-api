const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const NotFoundError = require('../errors/not-found-err');
const BadRequest = require('../errors/bad-request');
const EmailAlreadyToken = require('../errors/token-email');

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      const { _id, email, name } = user;
      res.send({ data: { _id, email, name } });
    })
    .catch((error) => {
      if (error.name === 'MongoError' && error.code === 11000) {
        throw new EmailAlreadyToken('Email already token');
      }
      if (error.name === 'ValidationError') {
        throw new BadRequest(error.message);
      } else {
        next(error);
      }
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User not found.');
      }
      res.send({ data: user });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        throw new NotFoundError('User not found.');
      } else {
        next(error);
      }
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User not found.');
      }
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        throw new NotFoundError('User not found.');
      } else {
        next(error);
      }
    })
    .catch(next);
};

// Исправить изменение данных юзера.
module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
    upsert: true,
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('User not found.');
      }
      res.send({ data: user });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        throw new BadRequest(error.message);
      } else if (error.name === 'CastError') {
        throw new NotFoundError('User not found.');
      } else {
        next(error);
      }
    })
    .catch(next);
};
