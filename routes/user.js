import express from "express";

import {
    createUser,
    getUsers,
    getUserID,
} from "../controllers/user.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserID);


export default router;