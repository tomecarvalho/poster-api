import express, { NextFunction, Response, Request } from "express";
import { connectMongoDb } from "./utils/connection/mongodb/mongodb-connection.js";
import env from "./env/env.js";
import indexRouter from "./routes/index.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";

const app = express();

// - Middleware

// Body parser
app.use(express.json({ limit: "10kb" }));

// Cookie Parser
app.use(cookieParser());

// Logger
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// CORS
app.use(cors());

// - /Middleware

// Global Error Handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/users", userRouter);

// Handle unknown routes
app.all("*", (req: Request, _res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

app.listen(env.PORT, () => {
  console.log(`Poster API listening on port ${env.PORT}`);
  connectMongoDb();
});
