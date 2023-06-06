import { Router } from "express";
import {
  deleteBoardgame,
  getBoardgames,
} from "../../server/controllers/boardgamesControllers/boardgamesControllers.js";
import { auth } from "../../server/middlewares/auth/authMiddleware.js";

const boardgamesRouter = Router();

boardgamesRouter.get("/", auth, getBoardgames);

boardgamesRouter.delete("/:boardgameId", auth, deleteBoardgame);

export default boardgamesRouter;
