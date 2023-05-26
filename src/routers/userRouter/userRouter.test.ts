import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../../server";
import connectToDatabase from "../../database/connectToDatabase";
import mongoose from "mongoose";
import User from "../../database/models/User/User";
import { type UserCredentials, type UserDatabaseData } from "../../types";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectToDatabase(server.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

afterEach(async () => {
  await User.deleteMany();
});

describe("Given a POST '/user/login' endpoint", () => {
  describe("When it receives a request with a valid user", () => {
    const databaseUser = {
      username: "admin",
      password: "$2y$10$UOUOQ6pB3FKQ3iGz.k9th.ouS4Hq84bABQ7JbZ7MNNHr5jdw40Fve",
      name: "Jimmy",
    };

    let newUser: UserDatabaseData;
    beforeEach(async () => {
      newUser = await User.create(databaseUser);
    });

    test("Then it should responde status 200 and a token", async () => {
      const expectedStatus = 200;
      const user: UserCredentials = {
        username: "admin",
        password: "hola",
      };

      const response: { body: { token: string } } = await request(app)
        .post("/user/login")
        .send(user)
        .expect(expectedStatus);

      const { token } = response.body;

      const payload = jwt.verify(token, process.env.JWT_SECRET!);

      const userId = payload.sub;

      expect(userId).toBe(newUser._id.toString());
    });
  });
});
