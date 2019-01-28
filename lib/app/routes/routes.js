"use strict";
module.exports = function (app, db) {
    app.post('/notes', function (req, res) {
        console.log(req.body);
        console.log(req.headers);
        res.send(req.body);
    });
};
