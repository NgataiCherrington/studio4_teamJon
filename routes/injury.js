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
import rbac from "../middleware/rbac.js";

router.post("/", validatePostInjury, jwtAuth, rbac("ADMIN"), createInjury);
router.get("/", jwtAuth, getInjuries, rbac("ADMIN"));
router.get("/:id", jwtAuth, getInjuryID, rbac("ADMIN"));
router.put("/:id", jwtAuth, validatePutInjury, rbac("ADMIN"), updateInjury);
router.delete("/:id", jwtAuth, deleteInjury, rbac("ADMIN"));

export default router;