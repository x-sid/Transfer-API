const request = require("supertest");
const clearDB = require("./clearDB");
const app = require("../app");

describe("Transaction Process Test", () => {
  let sendersToken, recipientAccountNumber;
  afterAll(async () => {
    await new Promise((resolve) => setTimeout(() => resolve(), 10000)); // avoid jest open handle error
  });

  beforeAll(async ()=>{
    await clearDB();
  })

  it("Successfully create senders account", async () => {
    const userDetails = {
      firstName: "sarah",
      lastName: "Conor",
      email: "sarah@test.com",
      phoneNumber: 805680945,
      transactionPin: 1234,
      password: "test123",
      confirmPassword: "test123",
    };

    const res = await request(app)
      .post("/api/v1/users/signup")
      .set({ "Content-Type": "application/json" })
      .send(userDetails);

    expect(res.body.success).toEqual(true);
    expect(res.body.message).toEqual("User signup successfully");
    expect(res.body.data).toHaveProperty("accountNumber");
  });

  it("Successfully create recievers account", async () => {
    const userDetails = {
      firstName: "john",
      lastName: "Conor",
      email: "john@test.com",
      phoneNumber: 805680945,
      transactionPin: 1234,
      password: "test123",
      confirmPassword: "test123",
    };

    const res = await request(app)
      .post("/api/v1/users/signup")
      .set({ "Content-Type": "application/json" })
      .send(userDetails);

    recipientAccountNumber = res.body.data.accountNumber;

    expect(res.body.success).toEqual(true);
    expect(res.body.message).toEqual("User signup successfully");
    expect(res.body.data).toHaveProperty("accountNumber");
  });

  it("Successfully login sender", async () => {
    const userDetails = {
      email: "sarah@test.com",
      password: "test123",
    };

    const res = await request(app)
      .post("/api/v1/users/login")
      .set({ "Content-Type": "application/json" })
      .send(userDetails);

    sendersToken = res.body.data.token;

    expect(res.body.success).toEqual(true);
    expect(res.body.message).toEqual("Success");
    expect(res.body.data).toHaveProperty("token");
  });

  it("Successfully perform transfer", async () => {
    const userDetails = {
      recipientAccountNumber: recipientAccountNumber,
      amount: 100,
      transactionPin: 1234,
    };

    const res = await request(app)
      .post("/api/v1/transactions/transfer")
      .set({ "Content-Type": "application/json" })
      .set({ Authorization: `JWT ${sendersToken}` })
      .send(userDetails);

    expect(res.body.success).toEqual(true);
    expect(res.body.message).toEqual("Success");
  });

  it("Successfully get transaction history for user", async () => {
    const res = await request(app)
      .get("/api/v1/transactions/history")
      .set({ "Content-Type": "application/json" })
      .set({ Authorization: `JWT ${sendersToken}` })
      

    expect(res.body.success).toEqual(true);
    expect(res.body.message).toEqual("Success");
  });
});
