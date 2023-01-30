import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import {getPayments, postPayments } from "@/controllers";
import { paymentSchema } from "@/schemas/payments-schema";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getPayments)
  .post("/process",validateBody(paymentSchema), postPayments)
  

export { paymentsRouter };