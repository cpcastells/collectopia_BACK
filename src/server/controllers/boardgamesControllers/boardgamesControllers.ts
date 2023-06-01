import { type NextFunction, type Response } from "express";
import Boardgame from "../../../database/models/Boardgame/Boardgame.js";
import { type CustomRequest } from "../../../types.js";

export const getBoardgames = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.userId;

    const boardgames = await Boardgame.find({ user: id }).limit(10).exec();

    res.status(200).json({ boardgames });
  } catch (error) {
    next(error);
  }
};
