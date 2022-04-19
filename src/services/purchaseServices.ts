import bcrypt from "bcrypt";

import * as errorTypes from "../error/errorTypes.js";


export function checkingPassword(password: string, passwordHash: string) {
    if (!bcrypt.compareSync(password, passwordHash))
      throw errorTypes.unauthorized("Senha incorreta");
}