import mongoose from 'mongoose';
import { Promise } from 'bluebird';
import { config } from '../config/db';

const inspect = require('../services/inspect');

Promise.promisifyAll(mongoose);

mongoose.connect(config.MONGO_URI, {
    autoReconnect: true,
    reconnectInterval: 100,
    reconnectTries: 1000,
    useNewUrlParser: true,
})
    .then(() => {
        console.log('Success connect to MongoDb');
    })
    .catch(inspect);

export default mongoose;
