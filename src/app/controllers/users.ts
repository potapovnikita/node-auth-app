import * as express from 'express';
import { User } from '../models/user';
import { IRequest } from '../middlewares';

/**
 * Get users list from db
 * @param {IRequest} req
 * @param {e.Response} res
 */
export const getUserList = (req: IRequest, res: express.Response) => {
    User.find({})
        .select('name email isBlocked birthday sex')
        .exec((err, users) => {
            if (err) {
                return res.status(500).json({
                    message: `Error: ${err}`,
                });
            }
            if (!users) {
                res.status(404).json({
                    message: 'Users not found',
                });
            }
            res.json(users);
        });
};

/**
 * Edit user
 * @param {IRequest} req
 * @param {e.Response} res
 */
export const editUserData = (req: IRequest, res: express.Response) => {
    if (!req.body.userId) {
        return res.status(400).json({
            message: 'Error: User id required',
        });
    }

    User.findOneAndUpdate({ _id: req.body.userId }, req.body)
        .select('name email isBlocked birthday sex')
        .exec((err, user) => {
            if (err) return res.sendStatus(500);
            if (!user) {
                res.status(404).json({
                    message: 'Users not found',
                });
            }
            res.json(user);
        });
};

/**
 * Get user data (for auth user )
 * @param {IRequest} req
 * @param {e.Response} res
 */
export const getUserData = (req: IRequest, res: express.Response) => {
    if (!req.authUserId) {
        return res.status(400).json({
            message: 'Error: User id required',
        });
    }
    User.findOne({ _id: req.authUserId })
        .select('name email isBlocked birthday sex')
        .exec((err, user) => {
            if (err) return res.sendStatus(500);
            if (!user) {
                res.status(404).json({
                    message: 'Users not found',
                });
            }
            res.json(user);
        });
};
