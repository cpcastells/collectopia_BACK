import bcrypt from "bcryptjs";
import { type NextFunction, type Response } from "express";
import CustomError from "../../CustomError/CustomError.js";
import { type UserCredentialsRequest } from "../../../types.js";
import User from "../../../database/models/User/User.js";
import jwt, { type JwtPayload } from "jsonwebtoken";

const loginUser = async (
  req: UserCredentialsRequest,
  res: Response,
  next: NextFunction
) => {
  const { password, username } = req.body;

  try {
    const user = await User.findOne({ username }).exec();

    if (!user || !(await bcrypt.compare(password, user.password))) {
      const customError = new CustomError(401, "Wrong credentials");

      throw customError;
    }

    const tokenPayload: JwtPayload = {
      sub: user._id.toString(),
      name: user.name,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

export default loginUser;
