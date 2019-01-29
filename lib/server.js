"use strict";
var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors');
var app = express();
var port = process.env.PORT || 8000;
app.use(cors({
    allowedHeaders: ['authorization', 'Content-Type'],
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
}));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require('./app/routes')(app, {});
app.listen(port, function (err) {
    if (err)
        return console.log(err);
    return console.log("Server listening " + port);
});
//# sourceMappingURL=server.js.map