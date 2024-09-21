import { Router } from "express";
import { registerHandler } from "../controllers/auth.controller";

const authRouter = Router();

// prefix /api/auth
authRouter.post("/register", registerHandler);

export default authRouter;
