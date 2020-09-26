const UserModel = require('../models/user.js');


module.exports.getUsers = (req, res) => {
  UserModel.find({})
    .then(users => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Запрашиваемый ресурс не найден' }));
};

module.exports.getUserById = (req, res) => {
  UserModel.findById(req.params.id)
  .then(user => res.send({ data: user }))
  .catch(() => res.status(500).send({ message: 'Запрашиваемый ресурс не найден' }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  UserModel.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: err.message }));
};
