import express from "express";

import {
    createUser,
    getUsers,
    getUserID,
    updateUser,
    deleteUser
} from "../controllers/user.js";

import {
    validatePostUser,
    validatePutUser,
} from "../middleware/validation/user.js"

const router = express.Router();
import jwtAuth from "../middleware/jwtauth.js";
import rbac from "../middleware/rbac.js";

router.post("/", validatePostUser, createUser);
router.get("/", getUsers);
router.get("/:id", getUserID);
router.put("/:id", jwtAuth,  rbac("ADMIN"), validatePutUser, updateUser);
router.delete("/:id", jwtAuth,  rbac("ADMIN"), deleteUser);

export default router;