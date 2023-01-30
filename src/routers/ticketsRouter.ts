import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getTicketTypes, userTicket, postTicketTypes } from "@/controllers";
import { paymentSchema } from "@/schemas";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getTicketTypes)
  .get("/", userTicket)
  .post("/", validateBody(paymentSchema), postTicketTypes)

export { ticketsRouter };
