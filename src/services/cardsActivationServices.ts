import * as errorTypes from "../error/errorTypes.js";

import bcrypt from "bcrypt";

export function checkingAtivatedCard(password: string) {
    if (password !== null)
      throw errorTypes.conflict("A ativação já foi feita");
}

export function checkingCVV(cvv: string, cvvHash: string) {
    if (!bcrypt.compareSync(cvv, cvvHash))
      throw errorTypes.unauthorized("CVC incorreto");
}