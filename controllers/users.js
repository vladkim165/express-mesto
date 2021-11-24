const validator = require('validator');
const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  if (!validator.isEmail(email)) {
    const err = new Error('Неверный формат почты');
    err.statusCode = 400;

    next(err);
  }

  return bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then(() => res.status(200).send({ message: 'Пользователь успешно создан' }))
        .catch((e) => {
          if (e.name === 'MongoServerError' && e.code === 11000) {
            const err = new Error('Пользователь с данным email уже существует');
            err.statusCode = 409;

            next(err);
          }
          const err = new Error('Ошибка. Переданы некорректные данные');
          if (e.name === 'ValidationError') {
            err.statusCode = 400;
          }
          next(err);
        });
    });
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        const err = new Error('Ошибка, пользователь не найден');
        err.statusCode = 404;

        next(err);
      }
      const {
        name,
        about,
        avatar,
        _id,
      } = user;
      return res.status(200).send({
        name,
        about,
        avatar,
        _id,
      });
    })
    .catch((e) => {
      const err = new Error('Ошибка. Переданы некорректные данные');

      if (e.name === 'CastError') {
        err.statusCode = 400;
      }
      next(err);
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        const err = new Error('Ошибка, пользователь не найден');
        err.statusCode = 404;

        next(err);
      }
      const {
        name,
        about,
        avatar,
        _id,
      } = user;
      return res.status(200).send({
        name,
        about,
        avatar,
        _id,
      });
    })
    .catch((e) => {
      const err = new Error('Ошибка. Переданы некорректные данные');
      if (e.name === 'CastError') {
        err.statusCode = 400;
      }

      next(err);
    });
};

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

module.exports.editProfile = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, {
    name, about, avatar,
  }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        const err = new Error('Ошибка, пользователь не найден');
        err.statusCode = 404;

        next(err);
      }
      const {
        userName,
        userAbout,
        userAvatar,
        _id,
      } = user;
      return res.status(200).send({
        userName,
        userAbout,
        userAvatar,
        _id,
      });
    })
    .catch((e) => {
      const err = new Error('Ошибка. Переданы некорректные данные');
      if (e.name === 'ValidationError') {
        err.statusCode = 400;
      }

      next(err);
    });
};

module.exports.editProfileAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, {
    avatar,
  }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        const err = new Error('Ошибка, пользователь не найден');
        err.statusCode = 404;

        next(err);
      }
      const {
        name,
        about,
        _id,
      } = user;
      return res.status(200).send({
        name,
        about,
        avatar,
        _id,
      });
    })
    .catch((e) => {
      const err = new Error('Ошибка. Переданы некорректные данные');
      if (e.name === 'ValidationError') {
        err.statusCode = 400;
      }

      next(err);
    });
};
