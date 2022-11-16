import { Contact } from "../../entities/contact";

export interface GetAllContactsUseCase {
  execute(): Promise<Contact[]>;
}