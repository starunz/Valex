import { Request, Response } from "express";

import purchaseSchema from "../schemas/purchaseSchema.js";
import * as errorTypes from "../error/errorTypes.js";

export async function purchase(req: Request, res: Response) {
    const { amount, businessId, password } = req.body;
  
    validatePurchase(req.body);
}

function validatePurchase(body: any) {
    const validation = purchaseSchema.validate(body);
  
    if (validation.error)
      throw errorTypes.UnprocessableEntity(
        `O valor deve ser um número inteiro acima de $0,
         o Id da empresa deve ser um núemro inteiro e a 
         senha deve conter 4 dígitos sendo eles números`
      );
}