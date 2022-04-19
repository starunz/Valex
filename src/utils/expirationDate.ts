import dayjs from "dayjs";

import * as errorTypes from "../error/errorTypes.js";

export function checkingExpirationDate(expirationDate: string) {
  const today = dayjs().format("MM/YY");
  
  if (dayjs(today).isAfter(dayjs(expirationDate)))
    throw errorTypes.conflict("O cartão foi expirado");
}