import User from "./userModel.js";
import config from "../../core/config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { tokenGenerator } from "../../core/middlewares.js";

/////Create user/////
export const createUser = async (req: Request, res: Response) => {
  req.payload = jwt.verify(tokenGenerator(req, res), config.SECRET);
  if (
    !req.body.password ||
    req.body.password.length < 6 ||
    req.body.password.length > 12
  )
    throw new Error("INVALID_PASSWORD");
  try {
    req.body.password = await bcrypt.hash(
      req.body.password,
      config.HASH_ROUNDS
    );
    if (req.payload.role !== "ADMIN") req.body.role = "USER";
    const user = await User.create(req.body);
    await user.save();
    return user;
  } catch (err) {
    throw new Error("INVALID_CREDENTIALS");
  }
};

/////Login/////
export const login = async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.body.email }).select(
    "+password"
  );
  if (!user || !(await bcrypt.compare(req.body.password, user.password)))
    throw new Error("INVALID_CREDENTIALS");
  const token = jwt.sign({ id: user._id, role: user.role }, config.SECRET);
  return { token };
};

/////Find user/////
export const findUser = async (req: Request, res: Response) => {
  req.payload = jwt.verify(tokenGenerator(req, res), config.SECRET);
  if (req.payload.role !== "ADMIN") {
    return await User.findById({ _id: req.payload.id });
  }
  if (!req.body) return await User.find({});
  try {
    return await User.findOne({ dni: req.params.dni });
  } catch (err) {
    throw new Error("NOT_FOUND");
  }
};

/////Update user/////
export const updateUser = async (req: Request, res: Response) => {
  req.payload = jwt.verify(tokenGenerator(req, res), config.SECRET);
  req.body.password = await bcrypt.hash(req.body.password, config.HASH_ROUNDS);
  if (req.payload.role !== "ADMIN") {
    return await User.findByIdAndUpdate(
      { _id: req.payload.id },
      {
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
      },
      { new: true }
    );
  }
  const user = await User.findOne({ dni: req.params.dni });
  if (!user) throw new Error("NOT_FOUND");
  return await User.findOneAndUpdate(
    { dni: req.params.dni },
    req.body,
    { new: true }
  );
};
