import request from "supertest";

import { Contact } from "../../../src/domain/entities/contact";
import { CreateContactUseCase } from "../../../src/domain/interfaces/use-cases/create-contact";
import { GetAllContactsUseCase } from "../../../src/domain/interfaces/use-cases/get-all-contacts";
import ContactRouter from "../../../src/presentation/routes/contact-router";
import server from "../../../src/server";

class MockGetAllContactsUseCase implements GetAllContactsUseCase {
  async execute(): Promise<Contact[]> {
    throw new Error("Method not implemented");
  }
}

class MockCreateContactUseCase implements CreateContactUseCase {
  async execute(contact: Contact): Promise<boolean> {
    throw new Error("Method not implemented");
  }
}

describe("Contact Router", () => {
  let mockCreateContactUseCase: CreateContactUseCase;
  let mockGetAllContactsUseCase: GetAllContactsUseCase;

  beforeAll(() => {
    mockGetAllContactsUseCase = new MockGetAllContactsUseCase();
    mockCreateContactUseCase = new MockCreateContactUseCase();

    server.use("/contact", ContactRouter(
      mockGetAllContactsUseCase,
      mockCreateContactUseCase
    ));
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /contact", () => {
    test('should return 200 with data', async () => {
      const expectedData = [{
        id: "1",
        surname: "Pontes",
        firstName: "Guilherme",
        email: "email@email.com",
      }]

      jest.spyOn(mockGetAllContactsUseCase, "execute")
        .mockImplementation(
          () => Promise.resolve(expectedData)
        )

      const response = await request(server).get("/contact");

      expect(response.status).toBe(200);
      expect(mockGetAllContactsUseCase.execute).toBeCalledTimes(1);
      expect(response.body).toStrictEqual(expectedData);
    });

    test("should return 500 on use case error", async () => {
      jest.spyOn(mockGetAllContactsUseCase, "execute")
        .mockImplementation(
          () => Promise.reject(Error())
        )

      const response = await request(server).get("/contact");

      expect(response.status).toBe(500);
    });
  });

  describe("POST /contact", () => {
    const data = {
      id: "1",
      surname: "Pontes",
      firstName: "Guilherme",
      email: "email@email.com",
    }

    test("sould return 201", async () => {
      jest.spyOn(mockCreateContactUseCase, "execute")
        .mockImplementation(
          () => Promise.resolve(true)
        )

      const response = await request(server).post("/contact").send(data);

      expect(response.status).toBe(201);
      expect(mockCreateContactUseCase.execute).toBeCalledTimes(1);
    });

    test("should return 500 on use case error", async () => {
      jest.spyOn(mockCreateContactUseCase, "execute")
        .mockImplementation(
          () => Promise.reject(Error())
        )

      const response = await request(server).post("/contact").send(data);

      expect(response.status).toBe(500)
    });
  });
});