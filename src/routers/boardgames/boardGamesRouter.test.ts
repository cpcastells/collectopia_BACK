import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import connectToDatabase from "../../database/connectToDatabase.js";
import Boardgame from "../../database/models/Boardgame/Boardgame.js";
import {
  boardGamesMock,
  boardgameByIdMock,
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

describe("Given a GET /boardgames/:boardgameId", () => {
  describe("When it receives a request with a valid token and valid boardgame ID", () => {
    test("Then it should return a 200 status and a a boardgame with that ID", async () => {
      const boardgame = await Boardgame.create(boardgameByIdMock);

      const selectedId = boardgame._id.toString();

      const returnedBoardgame = {
        id: selectedId,
        title: "Terraforming Mars",
        image: "terraforming_mars_image_url",
        category: "Strategy",
        mechanics: "Card Drafting",
        players: {
          min: 1,
          max: 5,
        },
        duration: 150,
        briefDescription:
          "Terraforming Mars is a science fiction board game where players act as corporations to transform Mars into a habitable planet.",
        price: 70,
        author: "Jacob Fryxelius",
        releaseYear: 2016,
        user: "646f7e585189305e28a57d55",
      };

      const expectedStatus = 200;

      const response = await request(app)
        .get(`/boardgames/${selectedId}`)
        .set("Authorization", `Bearer ${tokenMock}`)
        .expect(expectedStatus);

      expect(response.body.boardgame).toStrictEqual(returnedBoardgame);
    });
  });
});
