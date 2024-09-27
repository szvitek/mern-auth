import { Router } from "express";
import {
  deleteSessionsHandler,
  getSessionsHandler,
} from "../controllers/session.controller";

const sessionRouter = Router();

// prefix: /api/sessions
sessionRouter.get("/", getSessionsHandler);
sessionRouter.delete("/:id", deleteSessionsHandler);

export default sessionRouter;
