import { Request, Response } from "express";

import rechargeSchema from "../schemas/rechargeSchema.js";
import * as errorTypes from "../error/errorTypes.js";

export async function recharge(req: Request, res: Response) {
    const { amount } = req.body;

    validateRechargeAmount(req.body);
}

function validateRechargeAmount(body: any) {
    const validation = rechargeSchema.validate(body);
  
    if (validation.error)
      throw errorTypes.UnprocessableEntity(
        "A quantia de ser um valor inteiro acima de $0."
      );
}