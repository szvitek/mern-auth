import { Router } from "express";
import {
  loginHandler,
  logoutHandler,
  refreshHandler,
  registerHandler,
  verifyEmailHandler,
} from "../controllers/auth.controller";

const authRouter = Router();

// prefix /api/auth
authRouter.post("/register", registerHandler);
authRouter.post("/login", loginHandler);
authRouter.get("/refresh", refreshHandler);
authRouter.get("/logout", logoutHandler);
authRouter.get("/email/verify/:code", verifyEmailHandler);

export default authRouter;
