import express from "express";

// Import the index controllers module
import { getIndex } from "../controllers/index.js";

// Create and Express router
const router = express.Router();

// Create a GET route
router.get("/", getIndex);

// Export the router
export default router;