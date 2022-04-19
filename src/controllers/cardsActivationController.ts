import { Request, Response } from "express";

import cardActivationSchema from "../schemas/cardActivationSchema.js";
import * as errorTypes from "../error/errorTypes.js";


export async function cardActivation(req: Request, res: Response) {
    const { cvv, password } = req.body;

    validateCardActivation(req.body);
}

function validateCardActivation(body: any) {
    const validation = cardActivationSchema.validate(body);
  
    if (validation.error)
      throw errorTypes.UnprocessableEntity(
        "O CVC deve conter 3 dígitos sendo eles números e a senha deve conter 4 dígitos também sendo números"
      );
}