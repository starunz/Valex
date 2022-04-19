import { Request, Response } from "express";

import purchaseSchema from "../schemas/purchaseSchema.js";
import * as errorTypes from "../error/errorTypes.js";
import * as existingCard from "../utils/existingCardUtils.js";
import * as expirationDate from "../utils/expirationDateUtils.js";
import * as purchaseServices from "../services/purchaseServices.js"

export async function purchase(req: Request, res: Response) {
    const { amount, businessId, password } = req.body;
    const { cardId } = req.params;
  
    validatePurchase(req.body);

    const card = await existingCard.checkingCardExistence(
        Number(cardId)
    );
    
    expirationDate.checkingExpirationDate(card.expirationDate);

    purchaseServices.checkingPassword(password, card.password);

    const business = await purchaseServices.checkingBusiness(
        Number(businessId)
    );

    purchaseServices.checkingBusinessType(card.type, business.type);

    await purchaseServices.checkingCardBalance(Number(cardId), amount);

    purchaseServices.makePurchase(card.id, business.id, amount);
  
    res.sendStatus(201);
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