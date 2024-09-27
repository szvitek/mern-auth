import { Router } from "express";
import { getUserMeHandler } from "../controllers/user.controller";

const userRouter = Router();

// prefix: /api/user
userRouter.get("/me", getUserMeHandler);

export default userRouter;
