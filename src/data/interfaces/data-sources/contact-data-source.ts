import { Contact } from "../../../domain/entities/contact";

export interface ContactDataSource {
  create(contact: Contact): Promise<boolean>;
  getAll(): Promise<Contact[]>;
}