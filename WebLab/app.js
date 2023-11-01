require('dotenv').config({path: __dirname + '/.env'});
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({
    origin: true,
    credentials: true,
    exposedHeaders: ['set-cookie']
}));
app.use(require('cookie-parser')());
app.use(require('body-parser').json());
app.use(require('./session/session-middleware'));
app.use('/api', require('./routing/router'));
app.use(require('./error-handlig/error-handling-middleware'));
app.use(require('./error-handlig/unknown-route-middleware'));

module.exports = app;