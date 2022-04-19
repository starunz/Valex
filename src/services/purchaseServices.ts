import bcrypt from "bcrypt";

import * as errorTypes from "../error/errorTypes.js";
import * as businessRepository from "../repositories/businessRepository.js";

export function checkingPassword(password: string, passwordHash: string) {
    if (!bcrypt.compareSync(password, passwordHash))
      throw errorTypes.unauthorized("Senha incorreta");
}

export async function checkingBusiness(businessId: number) {
    const business = await businessRepository.findById(businessId);

    if (!business)
      throw errorTypes.notFound("Empresa não encontrada");
  
    return business;
}