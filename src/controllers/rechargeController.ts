import { Request, Response } from "express";

import rechargeSchema from "../schemas/rechargeSchema.js";
import * as errorTypes from "../error/errorTypes.js";
import * as existingCard from "../utils/existingCardUtils.js";
import * as checkingEmployee from "../utils/checkingEmployeeUtils.js";
import * as expirationDate from "../utils/expirationDate.js";
import * as rechargeServices from "../services/rechargeServices.js";

export async function recharge(req: Request, res: Response) {
  const { amount } = req.body;
  const { cardId } = req.params;
  const { company } = res.locals;

  validateRechargeAmount(req.body);

  const card = await existingCard.checkingCardExistence(
    Number(cardId)
  );

  await checkingEmployee.checkingEmployee(
    card.employeeId,
    company.id
  );

  expirationDate.checkingExpirationDate(card.expirationDate);

  await rechargeServices.rechargeCard(card.id, Number(amount));

  res.sendStatus(201);
}

function validateRechargeAmount(body: any) {
  const validation = rechargeSchema.validate(body);

  if (validation.error)
    throw errorTypes.UnprocessableEntity(
      "A quantia de ser um valor inteiro acima de $0."
    );
}