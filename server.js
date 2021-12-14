require('dotenv').config()
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors');
// const { Server } = require("socket.io");
// const io = new Server(server);
const ws = require('ws');

const user = require("./app/routes/user");
const blocker = require('./app/routes/blocker.js');


app.use(cors());
mongoose.Promise = global.Promise;

const username = process.env.USERNAME;
const password = process.env.PASSWORD;

const uri = `mongodb+srv://${username}:${password}@cluster0.hkrzv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const wsServer = new ws.Server({ noServer: true });

mongoose.connect(uri, {
  useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database. Error...', err);
  process.exit();
});

wsServer.on('connection', socket => {
  socket.on('message', message => console.log(message));
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// io.on('connection', (socket) => {
//   console.log('a user connected');
// });

app.use("/user", user);

app.use("/blocker", blocker);

app.listen(4000, function () {
  console.log('listening on 3000')
})
