import express from "express";
import {Request, Response, NextFunction} from 'express';
import {createUser, login, findUser, updateUser} from "./userControler.js"
import { tokenGenerator } from "../../core/middlewares.js";

const userRouter = express.Router()

userRouter.post('/', async(req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await createUser(req, res))
    } catch(e){
        next(e)
    }
});


userRouter.post('/login', async (req: Request, res: Response, next: NextFunction)=>{
    try{
        res.json(await login(req, res))
    } catch(e){
        next(e)
    }
}) 

userRouter.get('/:dni', async (req: Request, res: Response, next: NextFunction) =>{
    try{
        res.json(await findUser(req, res))
    } catch(e){
        next(e)
    }
})

userRouter.put('/:dni', async (req: Request, res: Response, next: NextFunction) =>{
    try{
        res.json(await updateUser(req, res))
    } catch(e){
        next(e)
    }
})

export default userRouter