import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import connectToDatabase from "../../database/connectToDatabase.js";
import Boardgame from "../../database/models/Boardgame/Boardgame.js";
import {
  boardGamesMock,
  newBoardgameMock,
} from "../../mocks/boardgameMocks.js";
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
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDZmN2U1ODUxODkzMDVlMjhhNTdkNTUiLCJuYW1lIjoiSm9ubnkiLCJpYXQiOjE2ODYyNjU3NTMsImV4cCI6MTY4Njg3MDU1M30.wbRC7-sqVGPKlPjR1cH-LXLcRei2E829vKiuAb1I5cE";

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

describe("Given a DELETE /boardgames/:boardgameId endpoint", () => {
  beforeEach(async () => {
    await Boardgame.create(boardGamesMock);
  });

  describe("When it receives a request with a valid token and valid boardgame ID,", () => {
    test("Then it should return a 200 status and a message 'Boardgame deleted!'", async () => {
      const expectedStatus = 200;
      const expectedMessage = "Boardgame deleted!";

      const response = await request(app)
        .delete(`/boardgames/${boardGamesMock[0]._id.toString()}`)
        .set("Authorization", `Bearer ${tokenMock}`)
        .expect(expectedStatus);

      expect(response.body.message).toBe(expectedMessage);
    });
  });
});

describe("Given a POST /boardgames/create endpoint", () => {
  describe("When it receives a request with a userId and a boardgame", () => {
    test("Then it should return a 201 status and the new boardgame", async () => {
      const expectedStatus = 201;
      const userBoardgame = newBoardgameMock;

      const response = await request(app)
        .post("/boardgames/create")
        .set("Authorization", `Bearer ${tokenMock}`)
        .send(userBoardgame)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("boardgame");
    });
  });
});
