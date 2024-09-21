import { ErrorRequestHandler, Response } from "express";
import { ZodError } from "zod";

import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/http";

const handleZodError = (res: Response, error: ZodError) => {
  const errors = error.issues.map(({ path, message }) => ({
    path: path.join("."),
    message,
  }));

  return res.status(BAD_REQUEST).json({
    message: error.message,
    errors,
  });
};

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(`PATH: ${req.path} - METHOD: ${req.method}`, error);

  if (error instanceof ZodError) {
    return handleZodError(res, error);
  }

  return res.status(INTERNAL_SERVER_ERROR).send("Internal Server Error");
};

export default errorHandler;
