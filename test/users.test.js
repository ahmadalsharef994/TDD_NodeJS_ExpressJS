const { User } = require("../models/user.model");
const request = require("supertest");
const app = require("../app");

describe("api/users", () => {
  describe("GET /", () => {
    it("should return all users as JSON", () => {
      return request(app)
        .get("/api/users")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("GET/:id", () => {
    it("should return a user if valid id is passed", async () => {
      const user = await User.findOne({
        email: "test@test.com",
      });
      return request(app)
        .get("/api/users/" + user._id)
        .expect(200);
    });

    it("should return 400 error when invalid object id is passed", async () => {
      return request(app).get("/api/users/1").expect(400);
    });
  });

  describe("POST /", () => {
    it("should return user when the all request body is valid", () => {
      request(app)
        .post("/api/users")
        .send({
          name: "test",
          email: "test3@gmail.com",
          age: 28,
        })
        .expect(200);
    });
  });

  describe("PUT /:id", () => {
    it("should update the existing order and return 200", async () => {
      const user = await User.create({
        email: `test${Math.random() * 10}@test.com`,
        age: 28,
        name: "Ahmad",
      });
      request(app)
        .put("/api/users/" + user._id)
        .send({
          name: "newTest",
          email: `newemail${Math.random() * 10}@gmail.com`,
          age: 27,
        })
        .expect(200)
    });
  });

  describe("DELETE /:id", () => {
    it("should delete requested id and return response 200", async () => {
      const user = await User.create({
        email: `test${Math.random() * 10}@test.com`,
        age: 28,
        name: "Ahmad",
      });
      request(app).delete("/api/users/" + user._id);
      expect(200);
    });
  });
});
