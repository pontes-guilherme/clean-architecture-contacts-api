import { Contact } from "../../../domain/entities/contact";
import { ContactDataSource } from "../../interfaces/data-sources/contact-data-source";
import { DatabaseWrapper } from "../../interfaces/data-sources/database";

export class MongoDBContactDataSource implements ContactDataSource {
  private database: DatabaseWrapper;

  constructor(database: DatabaseWrapper) {
    this.database = database;
  }

  async create(contact: Contact): Promise<boolean> {
    return this.database.insertOne(contact);
  }

  async getAll(): Promise<Contact[]> {
    return this.database.find({});
  }
}