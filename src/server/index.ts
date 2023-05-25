import express from "express";
import cors from "cors";

const allowedOrigin = process.env.ALLOWED_ORIGIN;

const options: cors.CorsOptions = {
  origin: allowedOrigin,
};

const app = express();

app.use(cors(options));

app.disable("x-powered-by");

export default app;
