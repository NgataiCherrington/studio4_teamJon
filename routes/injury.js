import express from "express";

import {
    createInjury,
    getInjuries,
    getInjuryID,
    updateInjury,
    deleteInjury,
} from "../controllers/injury.js";

const router = express.Router();

import jwtAuth from "../middleware/jwtauth.js";

router.post("/", jwtAuth, createInjury);
router.get("/", getInjuries);
router.get("/:id", getInjuryID);
router.put("/:id", updateInjury);
router.delete("/:id", deleteInjury);

export default router;