require('dotenv').config();

const routes = require('./routes')

const express = require('express');

const app = express();

app.use(express.json());
app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization");
      next();
    });
app.use(express.urlencoded({ extended: true }));
app.use('/api',routes);
app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);

module.exports = app;