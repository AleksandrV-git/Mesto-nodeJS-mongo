const router = require('express').Router();
const {getUsers, getUserById, createUser} = require('../controllers/users.js');


router.get('/', getUsers);

router.get('/:_id', getUserById);

router.post('/', createUser);

module.exports = router;
