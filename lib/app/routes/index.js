"use strict";
var noteRoutes = require('./routes');
module.exports = function (app, db) {
    noteRoutes(app, db);
};
