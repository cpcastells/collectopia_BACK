import { Router } from "express";
import {
  createBoardgame,
  deleteBoardgame,
  getBoardgameById,
  getBoardgames,
  updateBoardgame,
} from "../../server/controllers/boardgamesControllers/boardgamesControllers.js";
import { auth } from "../../server/middlewares/auth/authMiddleware.js";

const boardgamesRouter = Router();

boardgamesRouter.get("/", auth, getBoardgames);

boardgamesRouter.delete("/:boardgameId", auth, deleteBoardgame);

boardgamesRouter.post("/create", auth, createBoardgame);

boardgamesRouter.get("/:boardgameId", auth, getBoardgameById);

boardgamesRouter.put("/update", auth, updateBoardgame);

export default boardgamesRouter;
