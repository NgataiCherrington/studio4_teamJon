import express from "express";
import prisma from "../prisma/client.js";
console.log("prisma client imported in auth routes", prisma);
import { register, login, logout } from "../controllers/auth.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);

import jwtAuth from "../middleware/jwtauth.js";
import rbac from "../middleware/rbac.js";

router.get("/me", jwtAuth, async (req, res) => {
  console.log("/me endpoint hit, req.user:", req.user);
  console.log("looking for user with id:", req.user.id);

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
