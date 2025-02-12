const request = require("supertest");
const User = require("../models/User");
const app = require("../app");

describe("GET /users - Unit Tests", () => {
  let server;
  let mockUsers;
  let id;
  beforeAll(async () => {
    server = app.listen(3001, () => {
      console.log("Server Test connected to port 3001");
    });   
    id = "IcPu8oa0ytAUGbKAvczF"
    mockUsers = {
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

  
  it("should return a user created with id", async () => {
    jest.spyOn(User, "addUser").mockResolvedValue({id,...mockUsers});

    const response = await request(app).post("/api/users/create").send(mockUsers);

    expect(response.status).toBe(200);
    console.log("response.body",response.body)
    expect(response.body).toEqual({id,...mockUsers})
  //  expect(response.body).toEqual({id,...mockUsers});
  //  expect(User.addUser).toHaveBeenCalled(1);
  });


  it("should return an empty array when there are no users", async () => {
    jest.spyOn(User, "addUser").mockResolvedValue({});

    const response = await request(app).post("/api/users/create").send({});

    expect(response.body).toEqual({});
  });

  // Caso 3: Error en la base de datos
  it("should return 400 if there is a database error", async () => {
    jest.spyOn(User, "addUser").mockRejectedValue(new Error("Database Error"));
    
    const response = await request(app).post("/api/users/create").send(mockUsers);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Bad request");
  });


  it("should respond within 500ms", async () => {
    jest.spyOn(User, "addUser").mockResolvedValue({id,...mockUsers});

    const startTime = Date.now();
    const response = await request(app).post("/api/users/create").send(mockUsers);
    const duration = Date.now() - startTime;

    expect(response.status).toBe(200);
    expect(duration).toBeLessThan(500);
  });



  it("return with the format correct", async () => {
    jest.spyOn(User, "addUser").mockResolvedValue({id,...mockUsers});

    const response = await request(app).post("/api/users/create").send(mockUsers);

    expect(response.body).toBeInstanceOf(Object); // Verifica que sea un arreglo
    
  });


  it("should call the addUser function at least once", async () => {
    const addUserSpy = jest.spyOn(User, "addUser");

    await request(app).post("/api/users/create").send(mockUsers);

    expect(addUserSpy).toHaveBeenCalledTimes(1);
  });
 
});