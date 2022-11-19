import { DatabaseWrapper } from '../../../../src/data/interfaces/data-sources/database';
import { MongoDBContactDataSource } from '../../../../src/data/data-sources/mongodb/mongodb-contact-data-source';
import { Contact } from '../../../../src/domain/entities/contact';

describe("Contact Data Source", () => {
  let mockDatabase: DatabaseWrapper;

  beforeAll(() => {
    mockDatabase = {
      find: jest.fn(),
      insertOne: jest.fn(),
    }
  });

  beforeEach(() => {
    jest.clearAllMocks();
  })

  test("getAll", async () => {
    const ds = new MongoDBContactDataSource(mockDatabase);

    const mockData: Contact[] = [
      {
        firstName: "Guilherme",
        surname: "Pontes",
        email: "g@g.com",
      },
    ];

    jest.spyOn(mockDatabase, "find")
      .mockImplementation(
        () => Promise.resolve(mockData)
      );

    const result = await ds.getAll();

    expect(mockDatabase.find).toBeCalledWith({});
    expect(result).toStrictEqual(mockData);
  });

  test("create", async () => {
    const ds = new MongoDBContactDataSource(mockDatabase);

    const mockData: Contact = {
      firstName: "Guilherme",
      surname: "Pontes",
      email: "g@g.com",
    };

    jest.spyOn(mockDatabase, "insertOne")
      .mockImplementation(
        () => Promise.resolve(true)
      );

    const result = await ds.create(mockData);

    expect(mockDatabase.insertOne).toBeCalledWith(mockData);
    expect(result).toBe(true);
  });
});