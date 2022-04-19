import { NextFunction, Request, Response } from "express";

export function errorsHandlerMiddleware(error: any, req: Request, res: Response, next: NextFunction) {

  if (error.type === "unprocessable entity") return res.status(error.code).send(error.message);

  if (error.type === "unauthorized") return res.status(error.code).send(error.message);

  if (error.type === "not_found") return res.status(error.code).send(error.message);

  if (error.type === "conflict") return res.status(error.code).send(error.message);

  if (error.type === "forbidden") return res.status(error.code).send(error.message);

  res.sendStatus(500);
}