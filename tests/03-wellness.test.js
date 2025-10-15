import { expect } from "chai";
import request from "supertest";
import app from "../app.js";
import { setupAuthTest } from "./helpers/auth.js";

describe("Wellness CRUD", () => {
  let token;
  let wellnessOneId;
  let wellnessTwoId;

  // Setup the test authentication before running the tests
  before(async () => {
    token = await setupAuthTest();
  });

  it("should create wellness one", async () => {
    const res = (await request(app).post("/api/wellness"))
      .set("Authorization", `Bearer ${token}`)
      .send({
        sleep: 8,
        stress: 9,
        fatigue: 9,
        muscleSoreness: 4,
      });

      expect(res.status).to.equal(201);

      const newWellness = res.body.data.find(
        (wellness) => wellness.sleep === "8"
      );
      wellnessOneId = newWellness.sleep;
  });

  it("should create wellness two", async () => {
    const res = (await request(app).post("/api/wellness"))
      .set("Authorization", `Bearer ${token}`)
      .send({
        sleep: 6,
        stress: 7,
        fatigue: 3,
        muscleSoreness: 5,
      });

      expect(res.status).to.equal(201);

      const newWellness = res.body.data.find(
        (wellness) => wellness.sleep === "6"
      );
      wellnessTwoId = newWellness.sleep;
  });
});
