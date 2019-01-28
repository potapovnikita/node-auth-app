const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser  = require('body-parser');
const logger = require('morgan');
const cors = require('cors')

const app = express();

const port = process.env.PORT || 8000;

app.use(cors({
    allowedHeaders: ['authorization', 'Content-Type'],
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
}));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

require('./app/routes')(app, {});

app.listen(port, (err: any) => {
    if (err) return console.log(err);
    return console.log(`Server listening ${port}`);
});
