const request = require("supertest");
const User = require("../models/User");
const app = require("../app");
require("dotenv").config();


describe("GET /users - Unit Tests", () => {
  let server;

  beforeAll(async()=>{
   server = app.listen(3001,()=>{
    console.log("Server Test connected to port 3001")
   })
    mockUsers = [{ id: "IcPu8oa0ytAUGbKAvczF", name: "josue pereira", email:"josue123@hotmail.com", password:"121123" }];
  })

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    console.log("AfterAll: Finalizando pruebas...");
     await server.close();
  });


  it("should return a list of users", async () => {
    jest.spyOn(User, 'getAllUsers').mockResolvedValue(mockUsers);
  
    const response = await request(app).get("/api/users");
  
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUsers);
    expect(User.getAllUsers).toHaveBeenCalled();
  });

      
        it("should return an empty array when there are no users", async () => {
            jest.spyOn(User, 'getAllUsers').mockResolvedValue([]);

          const response = await request(app).get("/api/users");
      
          expect(response.status).toBe(200);
          expect(response.body).toEqual([]);
        });
    
        // 3. Caso de error en la base de datos
        it("should return 500 if there is a database error", async () => {
          jest.spyOn(User, 'getAllUsers').mockRejectedValue(new Error("Database Error"));
      
          const response = await request(app).get("/api/users");
      
          expect(response.status).toBe(500);
          expect(response.body.error).toBe("Internal Server Error");
        });
        
      
        // Caso de tiempo de respuesta (Debe responder en menos de 500ms)
        it("should respond within 500ms", async () => {
          jest.spyOn(User, 'getAllUsers').mockResolvedValue([{ id: "1", name: "John Doe" }]);
      
          const startTime = Date.now();
          const response = await request(app).get("/api/users");
          const duration = Date.now() - startTime;
      
          expect(response.status).toBe(200);
          expect(duration).toBeLessThan(500);
        });

        it("should return a max of user", async () => {
          const maxUser = [];
         for(let i=0 ; i<10000;i++){
               maxUser.push(mockUsers);
         }
         jest.spyOn(User, 'getAllUsers').mockResolvedValue(maxUser);
      
          const response = await request(app).get("/api/users");
      
          expect(response.status).toBe(200);
          expect(response.body).toEqual(maxUser);
        });

     it("return with the format correct",async()=>{
      jest.spyOn(User, 'getAllUsers').mockResolvedValue(mockUsers);

      const response = await request(app).get("/api/users");

       expect(response.body).toBeInstanceOf(Array); // Verifica que sea un arreglo
       expect(response.body.length).toBe(1); // Verifica la longitud del arreglo
     })

     it("should call the getAllUsers function at least once", async () => {
      const getAllUsersSpy = jest.spyOn(User, 'getAllUsers');
    
      await request(app).get("/api/users");
    
      expect(getAllUsersSpy).toHaveBeenCalledTimes(1);
    });

});
