import { Router } from "express";
import { loginHandler, registerHandler } from "../controllers/auth.controller";

const authRouter = Router();

// prefix /api/auth
authRouter.post("/register", registerHandler);
authRouter.post("/login", loginHandler);

export default authRouter;
