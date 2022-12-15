import express from "express";
import env from "./env/env.js";
import indexRouter from "./routes/index.js";

const app = express();

app.listen(env.PORT, () => {
  console.log(`Poster API listening on port ${env.PORT}`);
});

app.use("/", indexRouter);
