import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import prisma from "../prisma/client.js";

const register = async (req, res) => {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const phoneNumber = req.body.phoneNumber;
    const dob = req.body.dob;
    const role = req.body.role;

    // Check if user already exists by email address
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      return res.status(400).json({ message: "Email already in use. Enter Another" });
    }

    // Generate a random salt to make the password hash unique
    const salt = await bcryptjs.genSalt();

    // Hash the password with the salt
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create a new user with the hashed password
    user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        dob,
        phoneNumber,
        password: hashedPassword,
        role,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        dob: true,
        phoneNumber: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.status(201).json({
      message: "User registered successfully",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // Find user by email address
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid email address" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const { JWT_SECRET, JWT_LIFETIME } = process.env;

    // Create a JWT token with the user's ID, role and email address
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: JWT_LIFETIME }
    );

    return res.status(200).json({
      message: "User successfully logged in",
      token: token,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    // Get token from request header
    const authHeader = req.headers.authorization;
    if(!authHeader) {
      return res.status(400).json({
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1]; // Remove Bearer

    // Check if token is already blacklisted
    const exists = await prisma.blacklist.findUnique({
      where: { token },
    });

    if(exists) {
      return res.status(200).json({
        message: "Token already blacklisted",
      });
    }

    await prisma.blacklist.create({
      data: { token },
    });

    return res.status(200).json({
      message: "User logged out successfully",
    });
  } catch(err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}

export { register, login, logout };
