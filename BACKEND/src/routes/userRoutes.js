import express from "express";
import { createUser, getUser, updateProfile } from "../controllers/userController.js";

const router = express.Router();

// POST /api/users
router.post("/", createUser);

// GET /api/users/:username
router.get("/:username", getUser);

// PUT /api/users/:username/profile
router.put("/:username/profile", updateProfile);

export default router;

