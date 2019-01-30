import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import { config } from '../../config/index';
import { User, IUser } from '../models/user';
import { IRequest } from '../middlewares';

/**
 * SignUp method
 * @param {IRequest} req
 * @param {e.Response} res
 */
export const signup = (req: IRequest, res: express.Response) => {
    // Save User to Database
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
    });

    user.save()
        .then((savedUser) => {
            savedUser.save((err) => {
                if (err) res.status(500).json(`Error: ${err}`);
                res.status(200).json('User registered successfully!');
            });
        })
        .catch((err) => {
            console.log('err', err);
            res.status(500).json(`Error: ${err}`);
        });
};

/**
 * SignIn method
 * @param {IRequest} req
 * @param {e.Response} res
 */
export const signin = (req: IRequest, res: express.Response) => {
    if (!req.body.email || !req.body.password) {
        return res.sendStatus(400);
    }

    User.findOne({ email: req.body.email })
        .exec((err, user) => {
            if (err) {
                if (err.kind === 'ObjectId') {
                    return res.status(404).json({
                        message: `User not found with email ${req.body.email}`,
                    });
                }
                return res.status(500).json({
                    message: `Error retrieving User with email ${req.body.email}`,
                });
            }

            if (!user) {
                return res.status(404).json({
                    auth: false,
                    message: `User not found with email ${req.body.email}`,
                });
            }

            user.comparePassword(req.body.password, (err: string, isMatch: boolean) => {
                if (err) {
                    res.status(500).json({
                        message: 'Unhandled error',
                    });
                }

                if (!isMatch) {
                    return res.status(401).json({ auth: false, accessToken: null, reason: 'Invalid Password' });
                }
                const token = jwt.sign({ id: user._id }, config.TOKEN_SECRET, {
                    expiresIn: 86400, // expires token in 24 hours
                });

                return res.status(200).json({
                    auth: true,
                    accessToken: token,
                });
            });
        });
};
