import express from "express";
import cors from "cors";
import morgan from "morgan";
import { generalError } from "./middlewares/errors/errorMiddlewares";

const allowedOrigin = process.env.ALLOWED_ORIGIN;

const options: cors.CorsOptions = {
  origin: allowedOrigin,
};

const app = express();

app.use(cors(options));

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(generalError);

export default app;
