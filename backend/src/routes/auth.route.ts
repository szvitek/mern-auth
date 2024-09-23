import { Router } from "express";
import {
  loginHandler,
  logoutHandler,
  refreshHandler,
  registerHandler,
} from "../controllers/auth.controller";

const authRouter = Router();

// prefix /api/auth
authRouter.post("/register", registerHandler);
authRouter.post("/login", loginHandler);
authRouter.get("/refresh", refreshHandler);
authRouter.get("/logout", logoutHandler);

export default authRouter;
