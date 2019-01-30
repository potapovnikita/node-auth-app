import * as express from 'express';
import moment from 'moment';
import { verify } from 'jsonwebtoken';

import { config } from '../../config';

import { User, IUser } from '../models/user';

export interface PayloadType {
    exp?: number;
    id?: string;
    iat?: number;
}

export interface IRequest extends express.Request {
    authUserId?: string;
    userId?: string;
}

// Auth middleware
export const ensureAuthenticated = (req: IRequest, res: express.Response, next: express.NextFunction) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ error: 'TokenMissing' });
    }
    const token = req.headers.authorization.split(' ')[1];
    let payload: PayloadType;
    try {
        verify(token, config.TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(500).json({
                    auth: false,
                    message: `Fail to Authentication. Error ${err}`,
                });
            }

            payload = decoded as PayloadType;

            if (payload.exp && payload.exp <= moment().unix()) {
                return res.status(401).json({ error: 'Token Expired' });
            }
            // check if the user exists
            User.findById(payload.id, (err: any, user: IUser) => {
                console.log(payload);
                if (!err) {
                    if (!user) return res.status(401).json({ error: 'UserNotFound' });
                    if (user.isBlocked) return res.status(400).json({ error: 'UserIsBlocked' });
                    req.authUserId = payload.id;
                    next();
                } else {
                    return res.status(401).json({ error: `Unhandled error: ${err}` });
                }
            });
        });

    } catch (err) {
        return res.status(401).json({ error: 'TokenInvalid' });
    }
};

// middleware for check blocked user
export const checkBlockedUser = (req: IRequest, res: express.Response, next: express.NextFunction) => {
    User.findOne({ email: req.body.email })
        .exec((err, user) => {
            if (err && err.kind !== 'ObjectId') {
                res.status(500).json({
                    message: `Error retrieving User with Email = ${req.body.email}` ,
                });
                return;
            }
            if (user && user.isBlocked) return res.status(400).json({ error: 'UserIsBlocked' });
            next();
        });
};

// middleware for check unique user
export const checkUniqueLigin = (req: IRequest, res: express.Response, next: express.NextFunction) => {
    User.findOne({ email: req.body.email })
        .exec((err, user) => {
            if (err && err.kind !== 'ObjectId') {
                res.status(500).json({
                    message: `Error retrieving User with Email = ${req.body.email}` ,
                });
                return;
            }
            if (user) {
                res.status(400).json('Email is already in use!');
                return;
            }
            next();
        });
};
