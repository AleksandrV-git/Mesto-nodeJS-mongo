const router = require('express').Router();
const fs = require('fs').promises;
const path = require('path');

const pathToCards = path.join(__dirname, '../data/cards.json');
router.get('/', (_req, res) => {
  fs.readFile(pathToCards, 'utf8')
    .then((cards) => {
      res.send(JSON.parse(cards));
    })
    .catch(() => {
      res.status(500).send({ message: 'Запрашиваемый ресурс не найден' });
    });
});

module.exports = router;
