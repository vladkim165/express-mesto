const Card = require('../models/card')

module.exports.createCard = (req, res) => {
  const { name, link } = req.body
  const id = req.user._id
  Card.create({ name, link, owner: id })
    .then(card => {
      const { name, link, owner, likes, _id, createdAt } = card
      return res.status(200).send({ name, link, owner, likes, _id, createdAt })
    })
    .catch(err => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: `Ошибка. Переданы некорректные данные: ${err}` })
      }
      return res.status(500).send({ message: `Неизвестная ошибка ${err}` })
    })
}

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then(cards => res.status(200).send([cards]))
    .catch(err => res.status(500).send({ message: `Неизвестная ошибка: ${err}` }))
}

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(card => res.status(200).send(`Карточка успешно удалена: ${card}`))
    .catch(err => {
      return res.status(404).send({ message: `Ошибка. Карточка не найдена: ${err}` })
    })
}

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then(card => res.status(200).send(`Карточка успешно лайкнута: ${card}`))
    .catch(err => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: `Ошибка. Переданы некорректные данные: ${err}` })
      }
      if (err.name === "CastError") {
        return res.status(404).send({ message: `Ошибка, карточка не найдена ${err}` })
      }
      return res.status(500).send({ message: `Неизвестная ошибка ${err}` })
    })
}

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then(card => res.status(200).send(`Лайк успешно убран: ${card}`))
    .catch(err => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: `Ошибка. Переданы некорректные данные: ${err}` })
      }
      if (err.name === "CastError") {
        return res.status(404).send({ message: `Ошибка, карточка не найдена ${err}` })
      }
      return res.status(500).send({ message: `Неизвестная ошибка ${err}` })
    })
}