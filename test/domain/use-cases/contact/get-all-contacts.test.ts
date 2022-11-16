import { Contact } from "../../../../src/domain/entities/contact";
import { ContactRepository } from "../../../../src/domain/interfaces/repositories/contact-repository";
import { GetAllContacts } from "../../../../src/domain/use-cases/contact/get-all-contacts";

describe("Get All Contacts Use Case", () => {
  let mockContactRepository: ContactRepository;

  class MockContactRepository implements ContactRepository {
    createContact(contact: Contact): Promise<boolean> {
      throw new Error("Method not implemented");
    }
  
    getContacts(): Promise<Contact[]> {
      throw new Error("Method not implemented");
    }
  }

  beforeEach(() => {
    jest.clearAllMocks();
    mockContactRepository = new MockContactRepository();
  });

  test("should return data", async () => {
    const expectedResult: Contact[] = [
      {
        firstName: "Guilherme",
        surname: "Pontes",
        email: "email@email.com",
      }
    ]

    jest.spyOn(mockContactRepository, "getContacts")
      .mockImplementation(() => Promise.resolve(expectedResult))

    const sut = new GetAllContacts(mockContactRepository);
    const result = await sut.execute();
    
    expect(mockContactRepository.getContacts).toBeCalledTimes(1);
    expect(result).toStrictEqual(expectedResult);
  });
});