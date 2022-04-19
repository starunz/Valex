import { Router } from "express";
import * as createCardsController from "../controllers/createCardsController.js";

const cardsRouter = Router();

cardsRouter.post("/cards", createCardsController.creating);

export default cardsRouter;