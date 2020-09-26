const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const routeCards = require('./routes/cards.js');
const routeUsers = require('./routes/users.js');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res) => {
  req.user = {
      _id: '5d8b8592978f8bd833ca8133' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
}); 

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
    useFindAndModify: false
});


app.use(express.static(path.join(__dirname, './public')));
app.use('/users', routeUsers);
app.use('/cards', routeCards);
app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
