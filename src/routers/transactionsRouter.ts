import { Router } from "express";

import * as rechargeController from "../controllers/rechargeController.js"
import * as transactionsController from "../controllers/transactionsController.js";
import { validateApiKeyMiddleware } from "../middlewares/validateApiKeyMiddleware.js";

const transactionsRouter = Router();

transactionsRouter.post("/transactions/:cardId/recharge",
    validateApiKeyMiddleware,
    rechargeController.recharge
);

transactionsRouter.get(
    "/transactions/:cardId/panoramic",
    validateApiKeyMiddleware,
    transactionsController.transactions
);

export default transactionsRouter;