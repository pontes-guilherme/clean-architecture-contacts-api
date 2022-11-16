import { ContactDataSource } from "../../../src/data/interfaces/data-sources/contact-data-source";
import { Contact } from "../../../src/domain/entities/contact";
import { ContactRepository } from "../../../src/domain/interfaces/repositories/contact-repository";
import ContactRepositoryImpl from "../../../src/domain/repositories/contact-repository";

class MockContactDataSource implements ContactDataSource {
  async create(contact: Contact): Promise<boolean> {
    throw Error("Method not implemented");
  }

  async getAll(): Promise<Contact[]> {
    throw Error("Method not implemented");
  }
}

describe("Contact Repository", () => {
  let mockContactDataSource: ContactDataSource;
  let contactRepository: ContactRepository;


  beforeEach(() => {
    jest.clearAllMocks();
    mockContactDataSource = new MockContactDataSource();
    contactRepository = new ContactRepositoryImpl(mockContactDataSource);
  });

  describe("getAllContacts", () => {
    test("sould return contacts data", async () => {
      const testData: Contact[] = [
        {firstName: "G", surname: "P", email: "@"},
      ];

      jest.spyOn(mockContactDataSource, "getAll")
        .mockImplementation(
          () => Promise.resolve(testData)
        );
      
      const result = await contactRepository.getContacts();

      expect(mockContactDataSource.getAll).toBeCalledTimes(1);
      expect(result).toStrictEqual(testData);
    });
  });

  describe("createContact", () => {
    test("sould return true", async () => {
      const testData: Contact = {firstName: "G", surname: "P", email: "@"};

      jest.spyOn(mockContactDataSource, "create")
        .mockImplementation(
          () => Promise.resolve(true)
        );
      
      const result = await contactRepository.createContact(testData);

      expect(mockContactDataSource.create).toBeCalledTimes(1);
      expect(result).toBe(true);
    });
  });
});