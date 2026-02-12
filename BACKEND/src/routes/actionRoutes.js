import express from "express";
import { completeAction } from "../controllers/actionController.js";

const router = express.Router();

// POST /api/actions/complete
router.post("/complete", completeAction);

export default router;

