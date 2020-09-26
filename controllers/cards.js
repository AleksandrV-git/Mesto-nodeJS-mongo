const cardModel = require('../models/card.js');

module.exports.getCards = (req, res) => {
  cardModel.find({})
    .then(card => res.send({ data: card }))
    .catch(() => res.status(404).send({ message: 'Запрашиваемый ресурс не найден' }));
};

module.exports.DeleteCardById = (req, res) => {
  cardModel.findByIdAndRemove(req.params.cardId)
    .then(card => res.send({ data: card }))
    .catch(() => res.status(404).send({ message: 'Запрашиваемый ресурс не найден' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const ownerId = req.user._id

  cardModel.create({ name, link, owner: ownerId })
    .then(card => res.send({ data: card }))
    .catch((err) => {
      if (err.errors === "name" || "link" || "owner") {
        res.status(400).send({ message: 'Невалидные данные' });
      }
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.likeCard = (req, res) =>
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then(card => res.send({ data: card }))
    .catch(() => res.status(404).send({ message: 'Запрашиваемый ресурс не найден' }));

module.exports.dislikeCard = (req, res) =>
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then(card => res.send({ data: card }))
    .catch(() => res.status(404).send({ message: 'Запрашиваемый ресурс не найден' }));
