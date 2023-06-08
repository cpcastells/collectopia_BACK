import { type NextFunction, type Response } from "express";
import Boardgame from "../../../../database/models/Boardgame/Boardgame";
import {
  boardGamesMock,
  newBoardgameMock,
} from "../../../../mocks/boardgameMocks";
import { type CustomRequest } from "../../../../types";
import { createBoardgame } from "../boardgamesControllers";
import CustomError from "../../../CustomError/CustomError";

describe("Given a createBoardgame controller", () => {
  const next = jest.fn();

  const req: Partial<CustomRequest> = {
    userId: boardGamesMock[0].user.toString(),
    body: newBoardgameMock,
  };

  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  describe("When it receives a request with a userId and a boardgame", () => {
    test("Then it should call the response's status method with 200 and the response's json method with the new boardgame", async () => {
      const expectedStatusCode = 201;

      Boardgame.create = jest.fn().mockResolvedValue(newBoardgameMock);

      await createBoardgame(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith({ boardgame: newBoardgameMock });
    });
  });

  describe("When it receives a request with a userId and a newBoardgame and the process fails", () => {
    test("Then it should call the received next function with a custom error", async () => {
      const expectedStatusCode = 404;
      const expectedMessage = "Error: no boardgame was created";

      const expectedCustomError = new CustomError(
        expectedStatusCode,
        expectedMessage
      );

      Boardgame.create = jest.fn().mockResolvedValue(undefined);

      await createBoardgame(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedCustomError);
    });
  });
});
