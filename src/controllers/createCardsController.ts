import { Request, Response } from "express";

export async function creating(req: Request, res: Response) {
    const { cardType } = req.body;

    if (
        cardType !== "groceries" &&
        cardType !== "restaurant" &&
        cardType !== "transport" &&
        cardType !== "education" &&
        cardType !== "health"
     ) {

        return res.status(404).send("Tipo de cartão inválido");
    }

    res.sendStatus(200);
}