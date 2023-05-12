import express from "express";
import {Request, Response, NextFunction} from 'express';
import {createUser, login, findUser, updateUser} from "./userControler.js"
import { auth } from "../../core/middlewares.js";

const userRouter = express.Router()

userRouter.post('/', auth, async(req: Request, res: Response, next: NextFunction) => {
    try {
        res.json(await createUser(req.body, req.payload))
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

userRouter.get('/:dni', auth, async (req: Request, res: Response, next: NextFunction) =>{
    try{
        res.json(await findUser(req.params.dni, req.payload))
    } catch(e){
        next(e)
    }
})


userRouter.put('/:dni',auth, async (req: Request, res: Response, next: NextFunction) =>{
    try{
        res.json(await updateUser(req.params.dni, req.body, req.payload))
    } catch(e){
        next(e)
    }
})

export default userRouter