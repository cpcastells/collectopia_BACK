import { type NextFunction, type Response } from "express";
import Boardgame from "../../../../database/models/Boardgame/Boardgame";
import { boardGamesMock } from "../../../../mocks/boardgameMocks.js";
import { getBoardgames } from "../boardgamesControllers";
import { type CustomRequest } from "../../../../types.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a getBoardgames controller function", () => {
  const next = jest.fn();
  const req: Partial<CustomRequest> = {
    userId: "7686",
    query: { limit: "5" },
  };
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe("When it receives a request with a user id and a response", () => {
    Boardgame.find = jest.fn().mockReturnValue({
      limit: jest.fn().mockReturnThis(),
      sort: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(boardGamesMock),
    });

    test("Then it should call the response's status method with '200'", async () => {
      const expectedStatusCode = 200;

      await getBoardgames(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's json method with a list of two boardgames", async () => {
      const expectedBoardgames = boardGamesMock;

      await getBoardgames(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ boardgames: expectedBoardgames });
    });
  });

  describe("When it receives a next function and the exec method rejects with a 'Error: no connection with database'", () => {
    test("Then it should call next function with the error 'Error: no connection with database'", async () => {
      const expectedError = new Error("Error: no connection with database");

      Boardgame.find = jest.fn().mockReturnValue({
        limit: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        exec: jest.fn().mockRejectedValue(expectedError),
      });

      await getBoardgames(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
