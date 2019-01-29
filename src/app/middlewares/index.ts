import * as express from 'express';
import moment from 'moment';
import { sign, verify, JsonWebTokenError, NotBeforeError, TokenExpiredError } from 'jsonwebtoken';

import { config } from '../../config/db';

import { User, IUser } from '../models/user';

export interface PayloadType {
    exp?: any;
    sub?: any;
}

export interface IRequest extends express.Request {
    user?: IUser;
}

// Auth middleware
export const ensureAuthenticated = (req: IRequest, res: express.Response, next: express.NextFunction) => {
    if (!req.headers.authorization) {
        return res.status(401).send({ error: 'TokenMissing' });
    }
    const token = req.headers.authorization.split(' ')[1];
    let payload: PayloadType;
    try {
        verify(token, config.TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(500).send({
                    auth: false,
                    message: `Fail to Authentication. Error ${err}`,
                });
            }

            payload = decoded;

            if (payload.exp <= moment().unix()) {
                return res.status(401).send({ error: 'TokenExpired' });
            }
            // check if the user exists
            User.findById(payload.sub, (err: any, user: IUser) => {
                if (!err) {
                    if (!user) {
                        return res.status(401).send({ error: 'UserNotFound' });
                    }
                    req.user = payload.sub;
                    next();
                } else {
                    return res.status(401).send({ error: `Unhandled error: ${err}` });
                }
            });
        });

    } catch (err) {
        return res.status(401).send({ error: 'TokenInvalid' });
    }
};

// middleware for check unique user
export const checkUniqueLigin = (req: IRequest, res: express.Response, next: express.NextFunction) => {
    User.findOne({ email: req.body.email })
        .exec((err, user) => {
            if (err && err.kind !== 'ObjectId') {
                res.status(500).send({
                    message: `Error retrieving User with Email = ${req.body.email}` ,
                });
                return;
            }
            if (user) {
                res.status(400).send('Email is already in use!');
                return;
            }
            next();
        });
};
