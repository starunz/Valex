import { Request, Response, NextFunction } from "express";

import * as companyRepository from "../repositories/companyRepository.js";
import * as errorTypes from "../error/errorTypes.js";

export async function validateApiKeyMiddleware( req: Request, res: Response, next: NextFunction ) {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey)
    throw errorTypes.unauthorized("É necessário uma chave api");

  const company = await companyRepository.findByApiKey(apiKey.toString());
  if (!company)
    throw errorTypes.notFound("Chave api não encontrada");

  res.locals.company = company;

  next();
}