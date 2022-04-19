import { Request, Response } from "express";
import * as checkingEmployeeUtils from "../utils/checkingEmployeeUtils.js";
import * as errorTypes from "../error/errorTypes.js";

export async function creating(req: Request, res: Response) {
    const { employeeId, cardType } = req.body;
    const { company } = res.locals;
  
    validateCardType(cardType);
  
    const employee = await checkingEmployeeUtils.checkingEmployee(
      employeeId,
      company.id
    );
    console.log(employee)
    
    res.sendStatus(200);
}

function validateCardType(cardType: string) {
    if (
      cardType !== "groceries" &&
      cardType !== "restaurant" &&
      cardType !== "transport" &&
      cardType !== "education" &&
      cardType !== "health"
    ) {
      throw errorTypes.UnprocessableEntity("This card type is not valid.");
    }
}