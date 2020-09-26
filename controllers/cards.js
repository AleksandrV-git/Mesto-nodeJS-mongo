const cardModel = require('../models/card.js');


module.exports.getCards = (req, res) => {
  cardModel.find({})
    .then(card => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Запрашиваемый ресурс не найден' }));
};

module.exports.DeleteCardById = (req, res) => {
  cardModel.findByIdAndRemove(req.params.cardId)
  .then(card => res.send({ data: card }))
  .catch(() => res.status(500).send({ message: 'Запрашиваемый ресурс не найден' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  cardModel.create({ name, link })
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: err.message }));
};
