import { type NextFunction, type Response } from "express";
import { boardGamesMock } from "../../../../mocks/boardgameMocks";
import { type CustomRequest } from "../../../../types";
import Boardgame from "../../../../database/models/Boardgame/Boardgame";
import { getBoardgameById } from "../boardgamesControllers";

describe("Given a getBoardgameById", () => {
  const next = jest.fn();

  const req: Partial<CustomRequest> = {
    params: {
      boardgameId: boardGamesMock[0]._id.toString(),
    },
    userId: boardGamesMock[0].user.toString(),
  };

  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe("When it receives a request with an existing boardgame Id", () => {
    test("Then it should call the response's status method with 200 ", async () => {
      const expectedStatusCode = 200;

      Boardgame.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(boardGamesMock[0]),
      });

      await getBoardgameById(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });

  describe("When it receives a request with an existing boardgame Id", () => {
    test("Then it should call the response's json method with the corresponding boardgame ", async () => {
      const expectedBoardgame = boardGamesMock[0];

      Boardgame.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(boardGamesMock[0]),
      });

      await getBoardgameById(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ boardgame: expectedBoardgame });
    });
  });

  describe("When it receives a request with a valid user id and invalid boardgame id", () => {
    test("Then it should call the response's status method with '404'", async () => {
      const expectedStatusCode = 404;

      Boardgame.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(undefined),
      });

      await getBoardgameById(
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

      Boardgame.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(undefined),
      });

      await getBoardgameById(
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

      Boardgame.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(expectedError),
      });

      await getBoardgameById(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
