import * as express from 'express';

import { ensureAuthenticated, checkUniqueLigin } from '../middlewares';

import { signup, signin } from '../controllers/auth';

module.exports = (app: express.Application) => {
    app.post('/auth/signin', signin);
    app.post('/auth/signup', checkUniqueLigin, signup);
    // app.post('/auth/signout', ensureAuthenticated, signout);
    // app.post('/users/update', ensureAuthenticated, Users.update);
    // app.get('/users/list', ensureAuthenticated, Users.list);
};
