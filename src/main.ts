import { MongoClient } from "mongodb";
import { MongoDBContactDataSource } from "./data/data-sources/mongodb/mongodb-contact-data-source";
import { DatabaseWrapper } from "./data/interfaces/data-sources/database";
import ContactRepositoryImpl from "./domain/repositories/contact-repository";
import { CreateContact } from "./domain/use-cases/contact/create-contact";
import { GetAllContacts } from "./domain/use-cases/contact/get-all-contacts";
import ContactRouter from "./presentation/routes/contact-router";
import server from "./server";

(async () => {
  const client: MongoClient = new MongoClient("mongodb://contacts:contacts@localhost:27017");
  await client.connect();
  const db = client.db("CONTACTS_DB");

  const contactsDatabase: DatabaseWrapper = {
    find: (query) => db.collection("contacts").find(query).toArray(),
    insertOne: (doc) => db.collection("contacts").insertOne(doc),
  }

  const contactMiddleware = ContactRouter(
    new GetAllContacts(new ContactRepositoryImpl(new MongoDBContactDataSource(contactsDatabase))),
    new CreateContact(new ContactRepositoryImpl(new MongoDBContactDataSource(contactsDatabase)))
  );

  server.use("/contact", contactMiddleware);

  server.get("/", (_, res) => res.status(200).json({message: "Ok"}));

  server.listen(3333, () => console.log("[server]: Server is running at http://localhost:3333/"));
})();