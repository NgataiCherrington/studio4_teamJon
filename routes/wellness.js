import express from "express";

import {
    createWellness,
    getWellness,
    getWellnessID,
    updateWellness,
    deleteWellness,
} from "../controllers/wellness.js";

import {
    validatePostWellness,
    validatePutWellness,
} from "../middleware/validation/wellness.js";

const router = express.Router();

import jwtAuth from "../middleware/jwtauth.js";

router.post("/", validatePostWellness, jwtAuth, createWellness);
router.get("/", getWellness);
router.get("/:id", getWellnessID);
router.put("/:id", validatePutWellness, updateWellness);
router.delete("/:id", deleteWellness);

export default router;