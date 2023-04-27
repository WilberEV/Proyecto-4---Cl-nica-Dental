import User from "./userModel.js";
import config from "../../core/config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";


/////Create user/////
export const createUser = async (req: Request, res: Response) => {

let token = req.headers.authorization.split(' ')[1]
  req.payload = jwt.verify(token, config.SECRET)
  if (!req.body.password || req.body.password.length < 6 || req.body.password.length > 12)
    throw new Error("INVALID_PASSWORD");
  try {
    req.body.password = await bcrypt.hash(req.body.password, config.HASH_ROUNDS);
    if (req.payload.role !== "ADMIN") req.body.role = "USER";
    const user = await User.create(req.body);
    await user.save();
    res.json(user);
  } catch (err) {
    throw new Error("INVALID_CREDENTIALS");
  }
};


/////Login/////
export const login = async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.body.email }).select("+password");
  if (!user || !(await bcrypt.compare(req.body.password, user.password)))
    throw new Error("INVALID_CREDENTIALS");
  const token = jwt.sign({ id: user._id, role: user.role }, config.SECRET);
  res.json({ token });
};


/////Create user/////
export const findUser = async (req: Request, res: Response) => {
  if (res.role !== "ADMIN") return await User.find({ id: res._id });
  if (!req.body) return await User.find({});
  try {
    return await User.find({
      $or: [
        { name: req.body.name, lastname: req.body.lastname },
        { dni: req.body.dni },
        { email: req.body.email },
      ],
    });
  } catch (err) {
    throw new Error("NOT_FOUND");
  }
};
