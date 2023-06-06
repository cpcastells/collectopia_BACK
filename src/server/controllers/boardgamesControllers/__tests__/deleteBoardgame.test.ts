import { type NextFunction, type Response } from "express";
import { type CustomRequest } from "../../../../types";
import { deleteBoardgame } from "../boardgamesControllers.js";
import Boardgame from "../../../../database/models/Boardgame/Boardgame.js";
import { boardGamesMock } from "../../../../mocks/boardgameMocks.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a deleteBoardgame controller", () => {
  const next = jest.fn();

  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const req: Partial<CustomRequest> = {
    params: {
      boardgameId: boardGamesMock[0]._id.toString(),
    },
    userId: boardGamesMock[0].user.toString(),
  };

  describe("When it receives a request with a valid user id and boardgame id ", () => {
    test("Then it should call the response's status method with '200'", async () => {
      const expectedStatusCode = 200;

      Boardgame.findOneAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(boardGamesMock[0]),
      });

      await deleteBoardgame(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });

  describe("When it receives a request with a valid user id and boardgame id", () => {
    test("Then it should call the response's json method with the message 'Boardgame deleted!'", async () => {
      const expectedMessage = "Boardgame deleted!";

      Boardgame.findOneAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(boardGamesMock[0]),
      });

      await deleteBoardgame(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
  });

  describe("When it receives a request with a valid user id and invalid boardgame id", () => {
    test("Then it should call the response's status method with '404'", async () => {
      const expectedStatusCode = 404;

      Boardgame.findOneAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(undefined),
      });

      await deleteBoardgame(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });

  describe("When it receives a request with an user id and invalid boardgame id", () => {
    test("Then it should call the response's json method with the message 'Boardgame not found!'", async () => {
      const expectedMessage = "Boardgame not found";

      Boardgame.findOneAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(undefined),
      });

      await deleteBoardgame(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
  });

  describe("When it receives a next function and the exec method rejects with a 'Error: no connection with database'", () => {
    test("Then it should call next function with the error 'Error: no connection with database'", async () => {
      const expectedError = new Error("Error: no connection with database");

      Boardgame.findOneAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(expectedError),
      });

      await deleteBoardgame(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
