import * as errorTypes from "../error/errorTypes.js";
import * as cardRepository from "../repositories/cardRepository.js";

import bcrypt from "bcrypt";

export function checkingAtivatedCard(password: string) {
    if (password !== null)
      throw errorTypes.conflict("A ativação já foi feita");
}

export function checkingCVV(cvv: string, cvvHash: string) {
    if (!bcrypt.compareSync(cvv, cvvHash))
      throw errorTypes.unauthorized("CVC incorreto");
}

export function encryptPassword(password: string) {
    const passwordHash = bcrypt.hashSync(password, 10);
  
    return passwordHash;
}

export async function activateCard(
    cardId: number,
    password: string,
    isBlocked: boolean
) {
    await cardRepository.update(cardId, { password, isBlocked });
}