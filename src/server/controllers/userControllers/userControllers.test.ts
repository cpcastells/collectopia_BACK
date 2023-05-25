import { type NextFunction, type Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import {
  type UserCredentialsDatabaseStructure,
  type UserCredentials,
  type UserCredentialsRequest,
} from "../../../types.js";
import User from "../../../database/models/User/User.js";
import loginUser from "./userControllers.js";
import CustomError from "../../CustomError/CustomError.js";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a loginUser controller function", () => {
  const token = "234ewwe23r";

  const mockUserCredentials: UserCredentials = {
    username: "Jimmy",
    password: "1234",
  };

  const mockDataBaseUserData: UserCredentialsDatabaseStructure = {
    _id: new Types.ObjectId().toString(),
    username: "Jimmy",
    password: "1234",
  };

  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();
  const req: Partial<UserCredentialsRequest> = {
    body: mockUserCredentials,
  };

  describe("When it receives a request with valid username and password", () => {
    test("Then it should call the response's status method with a status code 200", async () => {
      const expectedStatusCode = 200;

      User.findOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockDataBaseUserData),
      });

      bcrypt.compare = jest.fn().mockReturnValue(true);

      jwt.sign = jest.fn().mockReturnValue(token);

      await loginUser(
        req as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's json method with a token", async () => {
      await loginUser(
        req as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ token });
    });
  });

  describe("When it receives a request with invalid username and password", () => {
    test("Then it should call the next function with a custom error with status 401 and message 'Wrong Credentials'", async () => {
      const expectedStatus = 401;
      const expectedMessage = "Wrong credentials";

      const error = new CustomError(expectedStatus, expectedMessage);

      User.findOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(undefined),
      });

      bcrypt.compare = jest.fn().mockReturnValue(false);

      await loginUser(
        req as UserCredentialsRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
