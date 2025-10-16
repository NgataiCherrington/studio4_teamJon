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

router.post("/", validatePostInjury, jwtAuth, rbac("ADMIN"), createInjury);
router.get("/", getInjuries, rbac("ADMIN"));
router.get("/:id", getInjuryID, rbac("ADMIN"));
router.put("/:id", validatePutInjury, rbac("ADMIN"), updateInjury);
router.delete("/:id", deleteInjury, rbac("ADMIN"));

export default router;