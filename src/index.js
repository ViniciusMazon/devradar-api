require('dotenv').config({ path: '.env' });
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');
const { setupWebSocket } = require('./websocket');
const routes = require('./routes');

const app = express();
const server = http.Server(app);

setupWebSocket(server);

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors({ origin: process.env.BASE_URL }));
app.use(express.json());
app.use(routes);

server.listen(3333);
