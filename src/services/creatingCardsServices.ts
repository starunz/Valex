import * as errorTypes from "../error/errorTypes.js";
import * as cardRepository from "../repositories/cardRepository.js";

export async function verifyEmployeeCards(type: cardRepository.TransactionTypes, employeeId: number) {
  const card = await cardRepository.findByTypeAndEmployeeId(type, employeeId);
  
  if (card) {
    throw errorTypes.conflict(
      "Este funcionário já possui um cartão com esse tipo"
    );
  }
}