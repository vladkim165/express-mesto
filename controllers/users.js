const User = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
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
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: `Ошибка. Переданы некорректные данные: ${err}` });
      }
      return res.status(500).send({ message: `Неизвестная ошибка ${err}` });
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Ошибка, пользователь не найден' });
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
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: `Ошибка. Переданы некорректные данные: ${err}` });
      }
      return res.status(500).send({ message: `Неизвестная ошибка ${err}` });
    });
};

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send({ message: `Неизвестная ошибка ${err}` }));
};

module.exports.editProfile = (req, res) => {
  const { name, about, avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, {
    name, about, avatar,
  }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Ошибка, пользователь не найден' });
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
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: `Ошибка. Переданы некорректные данные: ${err}` });
      }
      return res.status(500).send({ message: `Неизвестная ошибка ${err}` });
    });
};

module.exports.editProfileAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, {
    avatar,
  }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
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
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: `Ошибка. Переданы некорректные данные: ${err}` });
      }
      return res.status(500).send({ message: `Неизвестная ошибка ${err}` });
    });
};
