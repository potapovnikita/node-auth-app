import * as express from 'express';
import { ensureAuthenticated } from '../middlewares';

import auth from './auth';
import user from './user';

export const routes = (app: express.Application) => {
    /** Unsecured REST **/
    app.use('/auth', auth);

    /** Secured REST **/
    app.use('/users', ensureAuthenticated, user);

    /** Undefined REST **/
    app.use('*', (req, res, next) => {
        res.sendStatus(404);
    });
};
