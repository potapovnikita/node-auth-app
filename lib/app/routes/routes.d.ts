import * as express from 'express';
import { IUser } from '../models/user';
export interface PayloadType {
    exp: any;
    sub: any;
}
export interface IRequest extends express.Request {
    user: IUser;
}
