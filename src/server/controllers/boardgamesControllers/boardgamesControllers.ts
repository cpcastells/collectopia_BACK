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

export const deleteBoardgame = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params.boardgameId;

    const boardgame = await Boardgame.findOneAndDelete({ _id }).exec();

    if (!boardgame) {
      return res.status(404).json({ message: "Boardgame not found" });
    }

    res.status(200).json({ message: "Boardgame deleted!" });
  } catch (error) {
    next(error);
  }
};
