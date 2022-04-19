import { Request, Response } from "express";

import * as existingCard from "../utils/existingCardUtils.js";
import * as cardBalance from "../utils/cardBalance.js";

export async function transactions(req: Request, res: Response) {
    const { cardId } = req.params;
  
    await existingCard.checkingCardExistence(Number(cardId));

    const result = await cardBalance.getBalance(Number(cardId));

    res.status(200).send(result);
}