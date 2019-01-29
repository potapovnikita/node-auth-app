"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = __importDefault(require("moment"));
var jwt = __importStar(require("jwt-simple"));
var db_1 = require("../../config/db");
var auth_js_1 = require("./controllers/auth.js");
// Auth middleware
var ensureAuthenticated = function (req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send({ error: 'TokenMissing' });
    }
    var token = req.headers.authorization.split(' ')[1];
    var payload;
    try {
        payload = jwt.decode(token, db_1.config.TOKEN_SECRET);
    }
    catch (err) {
        return res.status(401).send({ error: 'TokenInvalid' });
    }
    if (payload.exp <= moment_1.default().unix()) {
        return res.status(401).send({ error: 'TokenExpired' });
    }
    // check if the user exists
    Person.findById(payload.sub, function (err, user) {
        if (!err) {
            if (!user) {
                return res.status(401).send({ error: 'UserNotFound' });
            }
            req.user = payload.sub;
            next();
        }
        else {
            return res.status(401).send({ error: "Unhandled error: " + err });
        }
    });
};
module.exports = function (app) {
    app.post('/auth/login', auth_js_1.Auth.login);
    app.post('/auth/signup', auth_js_1.Auth.signup);
    app.post('/auth/signout', auth_js_1.Auth.signout);
    app.post('/users/update', ensureAuthenticated, Users.update);
    app.get('/users/list', ensureAuthenticated, Users.list);
};
//# sourceMappingURL=routes.js.map