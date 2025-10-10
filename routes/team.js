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

router.post("/", validatePostTeam, jwtAuth, createTeam);
router.get("/", getTeams);
router.get("/:id", getTeamID);
router.put("/:id", validatePutTeam, updateTeam);
router.delete("/:id", deleteTeam);

export default router;