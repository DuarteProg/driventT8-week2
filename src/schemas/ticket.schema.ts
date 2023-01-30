import { SignInParams } from "@/services";
import Joi from "joi";

export const ticketSchema = Joi.object({
  ticketTypeId: Joi.string().email().required(),
});
