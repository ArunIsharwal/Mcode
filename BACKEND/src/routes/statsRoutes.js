import express from "express";
import { getTodayStats } from "../controllers/statsController.js";

const router = express.Router();

// GET /api/stats/today?username=...
router.get("/today", getTodayStats);

export default router;

