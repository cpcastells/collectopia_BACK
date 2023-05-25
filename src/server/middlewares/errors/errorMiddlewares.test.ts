import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../CustomError/CustomError.js";
import { generalError, notFoundError } from "./errorMiddlewares.js";

beforeEach(() => {
  jest.clearAllMocks();
});

const customErrorStatusCode = 404;
const customErrorMessage = "Endpoint not found";

const next = jest.fn();
const req = {};
const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe("Given a notFoundError middleware function", () => {
  describe("When it receives a request and a next function", () => {
    test("Then it shoud call next function with an error with status 404 and the message 'endpoint not found'", () => {
      const error = new CustomError(customErrorStatusCode, customErrorMessage);

      notFoundError(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given a generalError middleware function", () => {
  describe("when it receives a Custom error and a response", () => {
    const error = new CustomError(customErrorStatusCode, customErrorMessage);

    test("Then it should call the response's status with a 404", () => {
      generalError(
        error,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(customErrorStatusCode);
    });

    test("Then it should call the response's json with a message 'Endpoint not found'", () => {
      const error = new CustomError(customErrorStatusCode, customErrorMessage);

      generalError(
        error,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ message: customErrorMessage });
    });
  });

  describe("When it receives an error without status and a response", () => {
    const generalErrorStatusCode = 500;
    const generalErrorMessage = "Error with the server";

    const error = new Error(generalErrorMessage);

    test("Then it should call the response's status with the 500", () => {
      generalError(
        error as CustomError,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(generalErrorStatusCode);
    });

    test("Then it should call the response's json with the message 'Error with the server'", () => {
      generalError(
        error as CustomError,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ message: generalErrorMessage });
    });
  });
});
