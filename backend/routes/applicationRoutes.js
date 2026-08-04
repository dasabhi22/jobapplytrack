import express from "express";
import { getApplications } from "../controllers/applicationController.js";
import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();

router.get("/", authMiddleware, getApplications);

export default router;