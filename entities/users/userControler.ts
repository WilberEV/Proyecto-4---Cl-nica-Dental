import User from './userModel.js'
import config from '../../core/config.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {Request, Response} from 'express';

export const createUser = async (data, token) => {
    if(!data.password || data.password.length < 6 || data.password.length > 12) throw new Error ('INVALID_PASSWORD')
    try {
        data.password = await bcrypt.hash(data.password, config.HASH_ROUNDS);
        if (token.role !== 'ADMIN') data.role = 'USER';
        return User.create(data);
    } catch (err) {
      throw new Error ('INVALID_CREDENTIALS')
    }
};
