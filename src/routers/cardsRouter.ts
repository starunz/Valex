import { Router } from "express";
import * as createCardsController from "../controllers/createCardsController.js";
import { validateApiKeyMiddleware } from "../middlewares/validateApiKeyMiddleware.js";

const cardsRouter = Router();

cardsRouter.post("/cards", validateApiKeyMiddleware, createCardsController.creating);

export default cardsRouter;