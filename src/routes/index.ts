import express from "express";
import { mongooseConnect } from "../connection/connection.js";

const router = express.Router();

mongooseConnect();

router.get("/", (req, res) => {
  res.send("Hello World!!");
});

export default router;