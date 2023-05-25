import { type Response, type Request } from "express";
import pingController from "./pingController";

describe("Given a ping controller function", () => {
  describe("When it is called", () => {
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const req = {};

    test("Then it should call the response's status method with 200", () => {
      const mockStatus = 200;

      pingController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(mockStatus);
    });

    test("Then it should call the response's json method with the message 'pong'", () => {
      const mockMessage = "pong";

      pingController(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith({ message: mockMessage });
    });
  });
});
