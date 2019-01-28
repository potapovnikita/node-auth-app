const mongoose = require('mongoose')
const Promise = require('bluebird')
const config = require('../config/db')

const inspect = require('../services/inspect');

mongoose(Promise.promisifyAll);

mongoose.connect(config.url, {
    autoReconnect: true,
    reconnectInterval: 100,
    reconnectTries: 1000,
    useNewUrlParser: true,
}).catch(inspect);

export default mongoose;
