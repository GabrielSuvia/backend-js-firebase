const request = require("supertest");
const User = require("../models/User");
const app = require("../app");
require("dotenv").config();

describe("GET /users - Unit Tests", () => {
  let server;
  let mockUsers;

  beforeAll(async () => {
    server = app.listen(3001, () => {
      console.log("Server Test connected to port 3001");
    });
    mockUsers = {
        id: "IcPu8oa0ytAUGbKAvczF",
        name: "josue pereira",
        email: "josue123@hotmail.com",
        password: "121123",
      }
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    console.log("AfterAll: Finalizando pruebas...");
    await server.close();
  });


  it("should return a user with id", async () => {
    jest.spyOn(User, "getUserById").mockResolvedValue(mockUsers);

    const response = await request(app).get(`/api/users/${mockUsers.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUsers);
    expect(User.getUserById).toHaveBeenCalled();
  });


  
  it("should return an empty ", async () => {
    jest.spyOn(User, "getUserById").mockResolvedValue({});

    const response = await request(app).get(`/api/users/${mockUsers.id}`);

    expect(response.body).toEqual({});
  });


  it("should return 404 if there is a database error", async () => {
    jest.spyOn(User, "getUserById").mockRejectedValue(new Error("Database Error"));

    const response = await request(app).get("/api/users/32312");

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Usuario no encontrado");
  });

 
  it("should respond within 500ms", async () => {
    jest.spyOn(User, "getUserById").mockResolvedValue(mockUsers);

    const startTime = Date.now();
    const response = await request(app).get(`/api/users/${mockUsers.id}`);
    const duration = Date.now() - startTime;

    expect(response.status).toBe(200);
    expect(duration).toBeLessThan(500);
  });

  

  it("return with the format correct", async () => {
    jest.spyOn(User, "getUserById").mockResolvedValue(mockUsers);

    const response = await request(app).get(`/api/users/${mockUsers.id}`);

    expect(response.body).toBeInstanceOf(Object); // Verifica que sea un arreglo
   
  });


  it("should call the getUserById function at least once", async () => {
    const getUserByIdSpy = jest.spyOn(User, "getUserById");

    await request(app).get(`/api/users/${mockUsers.id}`);

    expect(getUserByIdSpy).toHaveBeenCalledTimes(1);
  });
  
});