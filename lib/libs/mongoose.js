"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var bluebird_1 = require("bluebird");
var db_1 = require("../config/db");
var inspect = require('../services/inspect');
bluebird_1.Promise.promisifyAll(mongoose_1.default);
mongoose_1.default.connect(db_1.config.MONGO_URI, {
    autoReconnect: true,
    reconnectInterval: 100,
    reconnectTries: 1000,
    useNewUrlParser: true,
})
    .then(function () {
    console.log('Success connect to MongoDb');
})
    .catch(inspect);
exports.default = mongoose_1.default;
//# sourceMappingURL=mongoose.js.map