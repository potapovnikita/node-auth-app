import * as crypt from 'crypto-js';

export const value = (length = 256) => {
    return crypt.lib.WordArray.random(length / 8).toString();
};
