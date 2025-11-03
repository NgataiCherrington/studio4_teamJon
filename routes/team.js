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

router.post("/", jwtAuth, rbac(["ADMIN"]), validatePostTeam, createTeam);
router.get("/", jwtAuth, rbac(["ADMIN", "NORMAL"]), getTeams);
router.get("/:id", jwtAuth, rbac(["ADMIN"]), getTeamID);
router.put("/:id", jwtAuth, rbac(["ADMIN"]), validatePutTeam, updateTeam);
router.delete("/:id", jwtAuth, rbac(["ADMIN"]), deleteTeam);

export default router;