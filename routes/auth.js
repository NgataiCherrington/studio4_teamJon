import express from "express";
import { prisma } from "../prismaClient.js";

import { register, login, logout } from "../controllers/auth.js";

const router = express.Router();
const prisma = new prisma();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);

import jwtAuth from "../middleware/jwtauth.js";
import rbac from "../middleware/rbac.js";

router.get("/me", jwtAuth, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        dob: true,
        phoneNumber: true,
        role: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
