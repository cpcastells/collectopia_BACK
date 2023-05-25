import request from "supertest";
import app from ".";

describe("Given a GET '/' endpoint ", () => {
  describe("When it  receives a request", () => {
    test("Then it should send a response with status 200 and message 'pong'", async () => {
      const expectedMessage = "pong";
      const expectedStatus = 200;

      const response = await request(app).get("/").expect(expectedStatus);

      const message = response.body.message as string;

      expect(message).toStrictEqual(expectedMessage);
    });
  });
});
