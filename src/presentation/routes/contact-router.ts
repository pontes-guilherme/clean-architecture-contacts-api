import express, { Request, Response } from "express";

import { CreateContactUseCase } from "../../domain/interfaces/use-cases/create-contact";
import { GetAllContactsUseCase } from "../../domain/interfaces/use-cases/get-all-contacts";

export default function ContactRouter(
  getAllContactsUseCase: GetAllContactsUseCase,
  createContactUseCase: CreateContactUseCase,
) {
  const router = express.Router();

  router.get("/", async (req: Request, res: Response) => {
    try {
      const contacts = await getAllContactsUseCase.execute();

      res.send(contacts);
    } catch (err) {
      res.status(500).send({
        message: "Error fetching data"
      });
    }
  });

  router.post("/", async (req: Request, res: Response) => {
    try {
      await createContactUseCase.execute(req.body);

      res.status(201).json({
        message: "Created"
      });
    } catch (err) {
      res.status(500).send({
        message: "Error saving data"
      });
    }
  });

  return router;
}