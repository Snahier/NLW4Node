import request from "supertest"
import { app } from "../app"
import createConnection from "../database"

describe("User", () => {
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()
  })

  request(app).post("/users").send({
    email: "user@example.com",
    name: "User Example",
  })
})
