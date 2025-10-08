import express from "express";

import {
    createUser,
    getUsers,
    getUserID,
    updateUser,
    deleteUser
} from "../controllers/user.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserID);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;