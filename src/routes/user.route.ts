import express from "express";
import {
  getAllUsersHandler,
  getMeHandler,
} from "../controllers/user.controller.js";
import { deserializeUser } from "../middleware/users/user-deserializer.js";
import { requireUser } from "../middleware/users/user-requirement.js";
import { restrictTo } from "../middleware/users/users-authorization.js";

const router = express.Router();
router.use(deserializeUser, requireUser);

// Admin Get Users route
router.get("/", restrictTo("admin"), getAllUsersHandler);

// Get my info route
router.get("/me", getMeHandler);

export default router;
