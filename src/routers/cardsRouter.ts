import { Router } from "express";
import * as createCardsController from "../controllers/createCardsController.js";
import { validateApiKeyMiddleware } from "../middlewares/validateApiKeyMiddleware.js";
import * as cardsActivationController from "../controllers/cardsActivationController.js"

const cardsRouter = Router();

cardsRouter.post("/cards", validateApiKeyMiddleware, createCardsController.creating);
cardsRouter.put("/cards/:cardId/activation", cardsActivationController.cardActivation);

export default cardsRouter;