import { ContactDataSource } from "../../data/interfaces/data-sources/contact-data-source";
import { Contact } from "../entities/contact";
import { ContactRepository } from "../interfaces/repositories/contact-repository";

export default class ContactRepositoryImpl implements ContactRepository {
  private contactDataSource: ContactDataSource;

  constructor(contactDataSource: ContactDataSource) {
    this.contactDataSource = contactDataSource;
  }

  async createContact(contact: Contact): Promise<boolean> {
    return this.contactDataSource.create(contact);
  }

  async getContacts(): Promise<Contact[]> {
    return this.contactDataSource.getAll();
  }
}