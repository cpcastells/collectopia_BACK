import { type NextFunction, type Response } from "express";
import { type CustomRequestUpdate } from "../../../../types";
import {
  boardGamesMock,
  boardgameCardMock,
} from "../../../../mocks/boardgameMocks";
import Boardgame from "../../../../database/models/Boardgame/Boardgame";
import { updateBoardgame } from "../boardgamesControllers";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a updateBoardgame function", () => {
  const next = jest.fn();

  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const req: Partial<CustomRequestUpdate> = {
    userId: boardGamesMock[0].user.toString(),
    body: boardgameCardMock,
  };

  describe("When it receives a request with a boardgame and a user ID", () => {
    test("Then it shoud call the response's status method with '200'", async () => {
      const expectedStatus = 200;

      Boardgame.findByIdAndUpdate = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(boardgameCardMock),
      });

      await updateBoardgame(
        req as CustomRequestUpdate,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response's json method with the message 'Boardgame was succesfully updated'", async () => {
      const expectedMessage = "Boardgame was succesfully updated";

      Boardgame.findByIdAndUpdate = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(boardgameCardMock),
      });

      await updateBoardgame(
        req as CustomRequestUpdate,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ message: expectedMessage });
    });
  });

  describe("When it receives a next function and the exec method rejects with a 'Error: no connection with database'", () => {
    test("Then it should call next function with the error 'Error: no connection with database'", async () => {
      const expectedError = new Error("Error: no connection with database");

      Boardgame.findByIdAndUpdate = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(expectedError),
      });

      await updateBoardgame(
        req as CustomRequestUpdate,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
