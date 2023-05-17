import User from "./userModel.js";
import config from "../../core/config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";


/////Create user/////
export const createUser = async (data) => {
  if (
    !data.password ||
    data.password.length < 6 ||
    data.password.length > 12
  )
    throw new Error("INVALID_PASSWORD");
  try {
    data.password = await bcrypt.hash(
      data.password,
      config.HASH_ROUNDS
    );
    const user = await User.create(data);
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
export const findUser = async (ID, token) => {
  if (token.role !== "ADMIN") {
    return await User.findById({ _id: token.id });
  }
  try {
    if(ID === 'DOCTOR' || ID === 'ADMIN' || ID === 'USER'){
      return await User.find({role: ID})
    }
    return await User.find({ email: ID });
  } catch (err) {
    throw new Error("NOT_FOUND");
  }
};

/////Update user/////
export const updateUser = async (ID, data, token) => {
  data.password = await bcrypt.hash(data.password, config.HASH_ROUNDS);
  if (token.role !== "ADMIN") {
    return await User.findByIdAndUpdate(
      { _id: token.id },
      {
        email: data.email,
        phone: data.phone,
        password: data.password,
      },
      { new: true }
    );
  }
  const user = await User.findOne({ dni: ID });
  if (!user) throw new Error("NOT_FOUND");
  return await User.findOneAndUpdate(
    { dni: ID },
    data,
    { new: true }
  );
};
