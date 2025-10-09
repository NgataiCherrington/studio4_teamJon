import express from "express";

import {
    createWellness,
    getWellness,
    getWellnessID,
    updateWellness,
    deleteWellness,
} from "../controllers/wellness.js";

const router = express.Router();

import jwtAuth from "../middleware/jwtauth.js";

router.post("/", jwtAuth, createWellness);
router.get("/", getWellness);
router.get("/:id", getWellnessID);
router.put("/:id", updateWellness);
router.delete("/:id", deleteWellness);

export default router;