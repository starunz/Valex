import { Router } from "express";

import * as rechargeController from "../controllers/rechargeController.js"
import { validateApiKeyMiddleware } from "../middlewares/validateApiKeyMiddleware.js";

const transactionsRouter = Router();

transactionsRouter.post("/transactions/:cardId/recharge",
    validateApiKeyMiddleware,
    rechargeController.recharge
);

export default transactionsRouter;