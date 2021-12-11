require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const { MongoClient } = require('mongodb');
const moment = require('moment');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const username = process.env.USERNAME;
const password = process.env.PASSWORD;

const uri = `mongodb+srv://${username}:${password}@cluster0.hkrzv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database. Error...', err);
  process.exit();
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

require('./app/routes/routes.js')(app);

app.listen(process.env.PORT || 3000, function () {
  console.log('listening on 3000')
})
