import express from "express";
import { logSugarEvent } from "../controllers/sugarController.js";

const router = express.Router();

// POST /api/sugar-log
router.post("/", logSugarEvent);

export default router;

