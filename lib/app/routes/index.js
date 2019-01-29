"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var middlewares_1 = require("../middlewares");
var auth_1 = require("../controllers/auth");
module.exports = function (app) {
    app.post('/auth/signin', auth_1.signin);
    app.post('/auth/signup', middlewares_1.checkUniqueLigin, auth_1.signup);
    // app.post('/auth/signout', ensureAuthenticated, signout);
    // app.post('/users/update', ensureAuthenticated, Users.update);
    // app.get('/users/list', ensureAuthenticated, Users.list);
};
//# sourceMappingURL=index.js.map