const router = require('express').Router();
const {getCards, DeleteCardById, createCard} = require('../controllers/cards.js');


router.get('/', getCards);

router.get('/:cardId', DeleteCardById);

router.post('/', createCard);

module.exports = router;
