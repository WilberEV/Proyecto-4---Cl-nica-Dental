import express from "express";
import {createUser, login, findUser} from "./userControler.js"

const userRouter = express.Router()

userRouter.get('/', findUser);
userRouter.post('/', createUser);
userRouter.post('/login',login) 

export default userRouter