const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const AuthError = require('../errors/auth-error');
const NotAuthError = require('../errors/not-auth-error');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new NotAuthError('Необходима авторизация.'));
  } else {
    const token = authorization.replace('Bearer ', '');
    let payload;
    try {
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    } catch (err) {
      next(new AuthError('Необходима авторизация.'));
    }
    req.user = payload;
    next();
  }
};
