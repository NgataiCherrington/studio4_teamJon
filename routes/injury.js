import express from "express";

import {
    createInjury,
    getInjuries,
    getInjuryID,
    updateInjury,
    deleteInjury,
} from "../controllers/injury.js";

import jwtAuth from "../middleware/jwtauth.js";

const router = express.Router();

router.post("/", createInjury);
router.get("/", getInjuries);
router.get("/:id", getInjuryID);
router.update("/:id", updateInjury);
router.delete("/:id", deleteInjury);

export default router;