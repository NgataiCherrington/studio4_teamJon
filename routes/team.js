import express from "express";

import {
    createTeam,
    getTeams,
    getTeamID,
    updateTeam,
    deleteTeam,
} from "../controllers/team.js";

import {
    validatePostTeam,
    validatePutTeam,
} from "../middleware/validation/team.js";

const router = express.Router();

import jwtAuth from "../middleware/jwtauth.js";
import rbac from "../middleware/rbac.js";

router.post("/", validatePostTeam, jwtAuth, rbac("ADMIN"), createTeam);
router.get("/", getTeams);
router.get("/:id", getTeamID);
router.put("/:id", validatePutTeam, updateTeam, rbac("ADMIN"));
router.delete("/:id", deleteTeam, rbac("ADMIN"));

export default router;