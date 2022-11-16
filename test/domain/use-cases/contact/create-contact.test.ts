import { Contact } from "../../../../src/domain/entities/contact";
import { ContactRepository } from "../../../../src/domain/interfaces/repositories/contact-repository";
import { CreateContact } from "../../../../src/domain/use-cases/contact/create-contact";

describe("Create Contact Use Case", () => {
  let mockContactRepository: ContactRepository;

  class MockContactRepository implements ContactRepository {
    createContact(contact: Contact): Promise<boolean> {
      throw new Error("Method not implemented");
    }
  
    getContacts(): Promise<Contact[]> {
      throw new Error("Method not implemented");
    }
  }

  beforeAll(() => {
    jest.clearAllMocks();
    mockContactRepository = new MockContactRepository();
  });

  test("should return true", async () => {
    const inputData: Contact = {
      firstName: "Guilherme",
      surname: "Pontes",
      email: "email@email.com",
    }

    jest.spyOn(mockContactRepository, "createContact")
      .mockImplementation(
        () => Promise.resolve(true)
      );
    
    const sut = new CreateContact(mockContactRepository);
    const result = await sut.execute(inputData);

    expect(mockContactRepository.createContact).toBeCalledTimes(1);
    expect(result).toBe(true);
  });
});