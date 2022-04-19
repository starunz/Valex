import { Request, Response } from "express";

import * as checkingEmployeeUtils from "../utils/checkingEmployeeUtils.js";
import * as errorTypes from "../error/errorTypes.js";
import * as creatingCardsServices from "../services/creatingCardsServices.js";

export async function creating(req: Request, res: Response) {
    const { employeeId, cardType } = req.body;
    const { company } = res.locals;
  
    validateCardType(cardType);
  
    const employee = await checkingEmployeeUtils.checkingEmployee(
      employeeId,
      company.id
    );
    
    await creatingCardsServices.checkingEmployeeCards(cardType, employeeId);

    const { 
        cardNum, 
        formattedName, 
        expirationDate, 
        cvvHash 
    } = creatingCardsServices.createCardDate(employee.fullName);

    const password = null;
    const isVirtual = false;
    const originalCardId = null;
    const isBlocked = true;
  
    await creatingCardsServices.createCreditCard(
      employee.id,
      cardNum,
      formattedName,
      cvvHash,
      expirationDate,
      password,
      isVirtual,
      originalCardId,
      isBlocked,
      cardType
    );

    res.sendStatus(201);
}

function validateCardType(cardType: string) {
    if (
      cardType !== "groceries" &&
      cardType !== "restaurant" &&
      cardType !== "transport" &&
      cardType !== "education" &&
      cardType !== "health"
    ) {
      throw errorTypes.UnprocessableEntity("tipo de cartão inválido");
    }
}