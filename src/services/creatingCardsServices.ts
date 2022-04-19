import * as errorTypes from "../error/errorTypes.js";
import * as cardRepository from "../repositories/cardRepository.js";

import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import bcrypt from "bcrypt";

export async function checkingEmployeeCards(type: cardRepository.TransactionTypes, employeeId: number) {
  const card = await cardRepository.findByTypeAndEmployeeId(type, employeeId);
  
  if (card) {
    throw errorTypes.conflict(
      "Este funcionário já possui um cartão com esse tipo"
    );
  }
}

export function createCardDate(employeeName: string) {
    const cardNum = faker.finance.creditCardNumber("mastercard");
    const formattedName = formatName(employeeName);
    const expirationDate = generalExpirationDate();
    const { cvv, cvvHash } = encryptCVV();
  
    return {
      cardNum,
      formattedName,
      expirationDate,
      cvv,
      cvvHash,
    };
}

export async function createCreditCard(
    employeeId: number,
    number: string,
    cardholderName: string,
    securityCode: string,
    expirationDate: string,
    password: string,
    isVirtual: boolean,
    originalCardId: number,
    isBlocked: boolean,
    type: cardRepository.TransactionTypes
  ) {
      
    await cardRepository.insert({
      employeeId,
      number,
      cardholderName,
      securityCode,
      expirationDate,
      password,
      isVirtual,
      originalCardId,
      isBlocked,
      type,
    });
}

function formatName(employeeName: string) {
  
    const name = employeeName.toUpperCase().split(" ");
  
    const firstName = name.shift();
  
    const middleName = name.filter(name => name.length >= 3)
  
    const lastName = name.pop();
  
    const finalName = [];
  
    const finalmiddleName = middleName.filter(
      (name) => name !== firstName && name !== lastName
    )
  
    finalName.push(firstName);
    finalmiddleName.forEach((name) => finalName.push(name[0]));
    finalName.push(lastName);
  
    return finalName.join(" ");
}

function generalExpirationDate() {
    return dayjs().add(5, "year").format("MM/YY");
}

function encryptCVV() {
    const cvv = faker.finance.creditCardCVV();
    const cvvHash = bcrypt.hashSync(cvv, 10);

    return {
      cvv,
      cvvHash,
    };
}