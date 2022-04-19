import * as errorTypes from "../error/errorTypes.js";

export function checkingAtivatedCard(password: string) {
    if (password !== null)
      throw errorTypes.conflict("A ativação já foi feita");
  }