import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import {MongoServerError} from 'mongodb';
import config from './config'

export const auth = (req: Request, res: Response, next: NextFunction) =>{
    let token: string | undefined = req.headers.authorization;
    if(!token) {
      return next(new Error('NO_TOKEN'))
    }
    token = token.split(' ')[1]
    try{
        req.payload = jwt.verify(token, config.SECRET);
        next();
    } catch(e){
        return next(new Error('INVALID_TOKEN'))
    }
}

