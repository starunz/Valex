import { Request, Response } from "express";

import * as existingCard from "../utils/existingCardUtils.js";

export async function transactions(req: Request, res: Response) {
    const { cardId } = req.params;
  
    await existingCard.checkingCardExistence(Number(cardId));
}