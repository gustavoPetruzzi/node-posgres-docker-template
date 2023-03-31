const express = require('express');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const db = require('./queries');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API sdfsd' })
});

app.get('/users', async (req, res) => {
  try {
    const users = await db.getUsers();
    return res.status(200).send(JSON.stringify(users));
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      error: "Not working"
    });
  }
});


app.get('/users/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = await db.getUserById(id);
    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      error: "Not working"
    })
  }
});

app.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUserId = await db.createUser(name, email)
    return res.status(201).send({
      message: `User created with id ${newUserId}`
    });
  } catch (error) {
    return res.status(500).send({
      error: "not working"
    })

  }
});


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`)
});

