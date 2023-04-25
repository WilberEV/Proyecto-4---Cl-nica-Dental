import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import {MongoServerError} from 'mongodb';
import config from './config'

export const auth = (req: Request, res: Response, next: NextFunction) =>{
    if(!req.headers.authorization) return next(new Error('NO_TOKEN'))
    let token = req.headers.authorization.split(' ')[1]
    if(!token) return next(new Error('NO_TOKEN'))
    try{
        req.payload = jwt.verify(token, config.SECRET);
        next();
    } catch(e){
        return next(new Error('INVALID_TOKEN'))
    }
}

export const errorHandler = (err: Error | MongoServerError, req: Request, res: Response, next: NextFunction) =>{
   if(err.message === 'NO_TOKEN') return res.status(401).json({error: 'NO_TOKEN'})
   if(err.message === 'INVALID_TOKEN') return res.status(403).json({error: 'INVALID_TOKEN'})
   if(err.message === 'NOT_FOUND') return res.status(404).json({error: 'NOT_FOUND'})
   if(err.message === 'INVALID_PASSWORD') return res.status(422).json({error: 'INVALID_PASSWORD'})
   if(err instanceof MongoServerError && err.code === 11000) return res.status(422).json({error: 'DUPLICATE_ENTITY', entities: Object.keys(err.keyPatter)})
   //Unknown Error
   console.error(err);
   return res.status(500).json({error: 'SERVER_ERROR', err})
}