const express = require('express');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const db = require('./queries');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API sdfsd' })
});

app.get('/users', db.getUsers);


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`)
});

