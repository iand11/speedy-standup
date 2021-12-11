const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const { MongoClient } = require('mongodb');
const moment = require('moment');

require('dotenv').config()
const username = process.env.USERNAME;
const password = process.env.PASSWORD;

const uri = `mongodb+srv://${username}:${password}@cluster0.hkrzv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
app.set('view engine', 'ejs')

MongoClient.connect(uri, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('speedy-standup');
    const blockersCollection = db.collection('blockers');

    app.get('/', (req, res) => {
      const currentDay = new Date();
      db.collection('blockers').find().toArray()
        .then(results => {
          const correctResults = results.filter((res) => moment(res.createdAt).isSame(currentDay, 'day'));
          res.render('index.ejs', { blockers: correctResults })
        })
        .catch(error => console.error(error))

    })

    app.post('/blockers', (req, res) => {
      const body = { ...req.body, createdAt: new Date() }
      blockersCollection.insertOne(body)
        .then(result => {
          res.redirect('/')
        })
        .catch(error => console.error(error))
    })
  })
  .catch(error => console.error(error))

app.use(bodyParser.urlencoded({ extended: true }))

app.listen(process.env.PORT || 3000, function () {
  console.log('listening on 3000')
})
