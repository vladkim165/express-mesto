const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const cookie = req.cookies.jwt;

  if (!cookie) {
    const err = new Error('Необходима авторизация');
    err.statusCode = 403;

    next(err);
  }

  let payload;

  try {
    payload = jwt.verify(cookie, process.env.JWT_SECRET);
  } catch (e) {
    const err = new Error('Необходима авторизация. Неверный токен');
    err.statusCode = 401;

    next(err);
  }
  req.user = payload;
  next();
};
