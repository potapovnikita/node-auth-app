"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
var Promise = require('bluebird');
var config = require('../config/db');
var inspect = require('../services/inspect');
mongoose(Promise.promisifyAll);
mongoose.connect(config.url, {
    autoReconnect: true,
    reconnectInterval: 100,
    reconnectTries: 1000,
    useNewUrlParser: true,
}).catch(inspect);
exports.default = mongoose;
