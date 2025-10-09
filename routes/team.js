import express from "express";

import {
    createTeam,
    getTeams,
    getTeamID,
    updateTeam,
    deleteTeam,
} from "../controllers/team.js";

const router = express.Router();

import jwtAuth from "../middleware/jwtauth.js";

router.post("/", jwtAuth, createTeam);
router.get("/", getTeams);
router.get("/:id", getTeamID);
router.put("/:id", updateTeam);
router.delete("/:id", deleteTeam);

export default router;