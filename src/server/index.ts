import express from "express";
import cors from "cors";
import morgan from "morgan";
import {
  generalError,
  notFoundError,
} from "./middlewares/errors/errorMiddlewares.js";
import pingController from "./controllers/ping/pingController.js";
import userRouter from "../routers/userRouter/userRouter.js";
import boardgamesRouter from "../routers/boardgames/boardgamesRouter.js";

const allowedOrigin = process.env.ALLOWED_ORIGIN;

const options: cors.CorsOptions = {
  origin: allowedOrigin,
};

const app = express();

app.use(express.json());

app.use(cors(options));

app.disable("x-powered-by");

app.use(morgan("dev"));

app.get("/", pingController);

app.use("/user", userRouter);

app.use("/boardgames", boardgamesRouter);

app.use(notFoundError);

app.use(generalError);

export default app;
