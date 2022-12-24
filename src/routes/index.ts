import express from "express";

const router = express.Router();

router.get("/health-check", (req, res) => {
  res.json({ success: true });
});

export default router;
