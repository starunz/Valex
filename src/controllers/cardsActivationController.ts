import { Request, Response } from "express";

import cardActivationSchema from "../schemas/cardActivationSchema.js";
import * as errorTypes from "../error/errorTypes.js";
import * as existingCard from "../utils/existingCard.js";
import * as cardsActivationServices from "../services/cardsActivationServices.js";

export async function cardActivation(req: Request, res: Response) {
    const { cvv, password } = req.body;
    const { cardId } = req.params;

    validateCardActivation(req.body);

    const card = await existingCard.checkingCardExistence(Number(cardId));
    
    cardsActivationServices.checkingAtivatedCard(card.password);

    cardsActivationServices.checkingCVV(cvv, card.securityCode);

    const passwordHash = cardsActivationServices.encryptPassword(password);
}

function validateCardActivation(body: any) {
    const validation = cardActivationSchema.validate(body);
  
    if (validation.error)
      throw errorTypes.UnprocessableEntity(
        "O CVC deve conter 3 dígitos sendo eles números e a senha deve conter 4 dígitos também sendo números"
      );
}