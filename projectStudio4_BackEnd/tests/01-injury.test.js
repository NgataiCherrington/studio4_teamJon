import { expect } from "chai";
import request from "supertest";
import app from "../app.js";
import { cleanupDatabase, disconnectPrisma } from "./helpers/auth.js";

describe("Injury CRUD", () => {
  let wellnessId;
  let injuryOneId;

  // Set up the wellness id before running the tests
  before(async () => {
    wellnessId = global.testWellnessId;
  });

  after(async () => {
    await cleanupDatabase();
    await disconnectPrisma();
  });

  it("should create injury one", async () => {
    const res = await request(app).post("/api/injuries").send({
      injuryCode: "ANK123",
      wellnessId: wellnessId,
    });

    // expect(res.status).to.equal(201);
    // expect(res.body.data).to.have.property("id");
    // injuryOneId = res.body.data.id;
  });

  it("should get all injuries", async () => {
    const res = await request(app).get(`/api/injuries`);

    expect(res.status).to.equal(200);
    expect(res.body.data.length).to.be.at.least(1);
  });

  it("should get injury one by id", async () => {
    const res = await request(app).get(`/api/injuries/${injuryOneId}`);

    expect(res.status).to.equal(200);
    expect(res.body.data.injuryCode).to.be.equal("ANK123");
  });

  it("should update injury one", async () => {
    const res = await request(app).put(`/api/injuries/${injuryOneId}`).send({
      injuryCode: "ACL564",
      wellnessId: wellnessId,
    });

    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal(
      `Injury with the id: ${injuryOneId} successfully updated`
    );
    expect(res.body.data.injuryCode).to.equal("ACL564");
  });

  it("should delete injury one", async () => {
    const res = await request(app).delete(`/api/injuries/${injuryOneId}`);

    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal(
      `Injury with the id: ${injuries} successfully deleted`
    );
  });
});
