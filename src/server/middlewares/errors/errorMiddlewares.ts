import "../../../loadEnvironment.js";
import { type NextFunction, type Request, type Response } from "express";
import createDebug from "debug";
import CustomError from "../../CustomError/CustomError.js";
import chalk from "chalk";
import { ValidationError } from "express-validation";

const debug = createDebug("collectopia-api:root:server:middlewares:errors");

export const notFoundError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new CustomError(404, "Endpoint not found");

  next(error);
};

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  debug(chalk.red(error.message));

  if (error instanceof ValidationError && error.details.body) {
    const validationErrorMessage = error.details.body
      .map((joiError) => joiError.message.replaceAll('"', " "))
      .join(" & ");

    (error as CustomError).publicMessage = validationErrorMessage;
    debug(chalk.red(validationErrorMessage));
  }

  const statusCode = error.statusCode || 500;
  const message = error.statusCode
    ? error.publicMessage
    : "Error with the server";

  res.status(statusCode).json({ message });
};
