import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import {MongoServerError} from 'mongodb';
import config from './config.js'


export const tokenGenerator = (req: Request, res: Response) =>{
    let token: string | undefined = req.headers.authorization;
    if(!token) {
      return res.status(401).json({error: 'NO_TOKEN'})
    }
    token = token.split(' ')[1]
    console.log(token, '/////token////')
    return token
}

export const auth = (req: Request, res: Response, next) =>{
    try{
        req.payload = jwt.verify(tokenGenerator(req, res), config.SECRET);
        console.log(req.payload, '/////req.payload/////')
        next();
    } catch(e){
        return next(new Error('INVALID_CREDENTIALS'))
    }
}


export const errorHandler = (err: Error | MongoServerError, req: Request, res: Response, next: NextFunction) =>{
    console.log(err, '/////////')
   if(err.message === 'NO_TOKEN') return res.status(401).json({error: 'NO_TOKEN'})
   if(err.message === 'INVALID_CREDENTIALS') return res.status(403).json({error: 'INVALID_CREDENTIALS'})
   if(err.message === 'NOT_FOUND') return res.status(404).json({error: 'NOT_FOUND'})
   if(err.message === 'INVALID_PASSWORD') return res.status(422).json({error: 'INVALID_PASSWORD'})
   if(err.message === 'NOT_AUTHORIZED') return res.status(401).json({error: 'NOT_AUTHORIZED'})
   if(err.message === 'MISSING_DATA') return res.status(400).json({error: 'MISSING_DATA'})
   if(err.message === 'DUPLICATED_DATE') return res.status(400).json({error: 'DUPLICATED_DATE'})
   
   if(err instanceof MongoServerError && err.code === 11000) return res.status(422).json({error: 'DUPLICATE_ENTITY', entities: Object.keys(err.keyPatter)})
   //Unknown Error
   console.error(err);
   return res.status(500).json({error: 'SERVER_ERROR', err})
}