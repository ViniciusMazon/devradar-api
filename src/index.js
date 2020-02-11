const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');
const { setupWebSocket } = require('./websocket');
const routes = require('./routes');

const app = express();
const server = http.Server(app);

setupWebSocket(server);

mongoose.connect('mongodb+srv://master:Liber888@cluster-jxc8m.mongodb.net/devradar?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(routes);

server.listen(3333);
