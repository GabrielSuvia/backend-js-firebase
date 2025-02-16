const request = require("supertest");
const User = require("../models/User");
const app = require("../app");
const jwt = require('jsonwebtoken');
/*
//  Mock de `jsonwebtoken`
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
  sign: jest.fn().mockResolvedValue("11j2k3jh1j2h3")
}));
*/
describe("POST /api/auth/login - Unit Tests", () => {
  let server;
  let mockUsers;

  beforeAll(async () => {
    server = app.listen(3001, () => {
      console.log("Server Test connected to port 3001");
    });
    mockUsers = {
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


  it("should log in successfully", async () => {
    let arrayUser = [];
    arrayUser.push(mockUsers)
    jest.spyOn(User, "getAllUsers").mockResolvedValue(arrayUser);
    jest.spyOn(jwt, "sign").mockResolvedValue('11j2k3jh1j2h3');

    const response = await request(app).post("/api/auth/login").send(mockUsers);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('11j2k3jh1j2h3');//or tocken
  });  


  
  it("should return an empty ", async () => {
    const empty = [];
    jest.spyOn(User, "getAllUsers").mockResolvedValue(empty);
    const user = empty.filter((ele)=>ele.password === mockUsers.password && ele.email === mockUsers.email )
    if(user.length === 1){
      jest.spyOn(jwt, "sign").mockResolvedValue('11j2k3jh1j2h3');
    };

    const response = await request(app).post(`/api/auth/login`).send(mockUsers);

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Credenciales no validas');
  });


  it("should return 401 if there is a database error", async () => {
    jest.spyOn(User, "getAllUsers").mockRejectedValue(new Error("Database Error"));

    const response = await request(app).post("/api/auth/login").send(mockUsers);

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Credenciales no validas');
  });




  it("should respond within 500ms", async () => {
    jest.spyOn(User, "getAllUsers").mockResolvedValue([mockUsers]);

    jest.spyOn(jwt, "sign").mockResolvedValue('11j2k3jh1j2h3');

    const startTime = Date.now();
    const response = await request(app).post("/api/auth/login").send(mockUsers);
    const duration = Date.now() - startTime;

    expect(response.status).toBe(200);
    expect(duration).toBeLessThan(500);
  });



  it("return with the format correct", async () => {
    jest.spyOn(User, "getAllUsers").mockResolvedValue([mockUsers]);
    jest.spyOn(jwt, "sign").mockResolvedValue('11j2k3jh1j2h3');

    const response = await request(app).post("/api/auth/login").send(mockUsers);

    expect(response.body).toBeInstanceOf(Object); // Verifica que sea un arreglo
  });


  it("should call the getAllUsers function at least once", async () => {
    const getUserByIdSpy = jest.spyOn(User, "getAllUsers");
    const GetToken = jest.spyOn(jwt, "sign");

    await request(app).post("/api/auth/login").send(mockUsers);

    expect(getUserByIdSpy).toHaveBeenCalledTimes(1);
    expect( GetToken).toHaveBeenCalledTimes(1);
  });

});