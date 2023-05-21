import express from "express";
import {Request, Response, NextFunction} from 'express';
import { treatmentDetails } from "./controler.js";

const treatmentRouter = express.Router()

treatmentRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) =>{
    try{
        res.json(await treatmentDetails(req.params.id))
    } catch(e){
        next(e)
    }
})

export default treatmentRouter