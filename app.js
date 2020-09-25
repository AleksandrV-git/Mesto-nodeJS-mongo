const express = require('express');
const path = require('path');
const routeCards = require('./routes/cards.js');
const routeUsers = require('./routes/users.js');

const { PORT = 3000 } = process.env;

const app = express();

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
