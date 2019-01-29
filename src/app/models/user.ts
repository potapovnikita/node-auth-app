import * as express from 'express';
import { Schema, Document, model, PaginateModel, Model } from 'mongoose';
import mongoose from '../../libs/mongoose';
import mongoosePaginate from 'mongoose-paginate';
import * as bcrypt from 'bcrypt';
import * as uuid from 'shortid';
// import * as crypt from 'crypto-js';
// import { value as hashValue } from '../../services/random';

const SALT_WORK_FACTOR = 10;

export interface IUser extends Document {
    name: string;
    birthday: Date;
    sex: string;
    email: string;
    password: string;
    isBlocked: boolean;
    comparePassword: (password: string, callback: Function) => {};
}

const userSchema: Schema = new mongoose.Schema({
    uuid: {
        default: uuid.generate,
        index: true,
        type: String,
        unique: true,
    },
    name: String,
    birthday: Date,
    sex: String,
    email: {
        type: String,
        unique: true,
        index: true,
        lowercase: true,
        required: 'EmailInvalid',
    },
    password: {
        type: String,
        required: 'PasswordInvalid',
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
});

userSchema.plugin(mongoosePaginate as any);

userSchema.pre<IUser>('save', function (next: express.NextFunction) {
    let pass = this.password
    if (!this.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR,  (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(pass, salt, (err, hash) => {
            if (err) return next(err);
            pass = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (password: string, callback: Function) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) callback(err);
        callback(null, isMatch);
    });
};

interface UserModel <T extends Document> extends PaginateModel<T> {}

export const User: UserModel<IUser> = model<IUser>('User', userSchema);
