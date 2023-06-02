import { Router } from "express";
import { getBoardgames } from "../../server/controllers/boardgamesControllers/boardgamesControllers.js";
import { auth } from "../../server/middlewares/auth/authMiddleware.js";

const boardgamesRouter = Router();

boardgamesRouter.get("/", auth, getBoardgames);

export default boardgamesRouter;
