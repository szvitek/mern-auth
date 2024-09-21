import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";

import connectToDatabase from "./config/db";
import { APP_ORIGIN, NODE_ENV, PORT } from "./config/env";
import { OK } from "./constants/http";
import errorHandler from "./middleware/errorHandler";
import authRouter from "./routes/auth.route";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/", (_req, res) => {
  return res.status(OK).json({
    status: "healthy",
  });
});

app.use("/api/auth", authRouter);

// 404 - not found
app.use((_req, res, _next) => {
  res.status(404).send("Not Found");
});

// generic error handler
app.use(errorHandler);

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(
      `Server is running on port ${PORT} in ${NODE_ENV} environment.`
    );
  });
});
