import express from "express";

import {
    createInjury,
    getInjuries,
    getInjuryID,
    updateInjury,
    deleteInjury,
} from "../controllers/injury.js";

import {
    validatePostInjury,
    validatePutInjury,
} from "../middleware/validation/injury.js";

const router = express.Router();

import jwtAuth from "../middleware/jwtauth.js";

router.post("/", validatePostInjury, jwtAuth, createInjury);
router.get("/", getInjuries);
router.get("/:id", getInjuryID);
router.put("/:id", validatePutInjury, updateInjury);
router.delete("/:id", deleteInjury);

export default router;