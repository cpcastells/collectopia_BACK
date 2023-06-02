import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import connectToDatabase from "../../database/connectToDatabase.js";
import Boardgame from "../../database/models/Boardgame/Boardgame.js";
import { boardGamesMock } from "../../mocks/boardgameMocks.js";
import app from "../../server/index.js";
import request from "supertest";

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
  await Boardgame.deleteMany();
});

const tokenMock =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDZmN2U1ODUxODkzMDVlMjhhNTdkNTUiLCJuYW1lIjoiSm9ubnkiLCJpYXQiOjE2ODU2NjAwMjMsImV4cCI6MTY4NjI2NDgyM30.RJkWe8CffdcBKuDQwiuP3iU7sCLX1bKtIEZnFa3fm3g";

describe("Given a GET /boardgames endpoint", () => {
  beforeEach(async () => {
    await Boardgame.create(boardGamesMock);
  });

  describe("When it receives a request with an authorization header containing a valid token,", () => {
    test("Then it should return a 200 status and a collection of boardgames", async () => {
      const expectedStatus = 200;
      const response = await request(app)
        .get("/boardgames")
        .set("Authorization", `Bearer ${tokenMock}`)
        .expect(expectedStatus);

      expect(response.body.boardgames).toHaveLength(2);
    });
  });
});
