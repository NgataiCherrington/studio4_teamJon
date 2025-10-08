import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import prisma from "../prisma/client.js";

const register = async (req, res) => {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const emailAddress = req.body.emailAddress;
    const password = req.body.password;
    const phoneNumber = req.body.phoneNumber;
    const dateOfBirth = new Date(req.body.dateOfBirth);
    const role = req.body.role;

    // Check if user already exists by email address
    let user = await prisma.user.findUnique({
      where: { emailAddress },
    });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
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
        emailAddress,
        dateOfBirth,
        phoneNumber,
        password: hashedPassword,
        role,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        emailAddress: true,
        dateOfBirth: true,
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
    const emailAddress = req.body.emailAddress;
    const password = req.body.password;

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { emailAddress },
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    // Compare the provided password with the hashed password in the database
    const isPassword = await bcryptjs.compare(password, user.password);
    if (!isPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const { JWT_SECRET, JWT_LIFETIME } = process.env;

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        emailAddress: user.emailAddress,
      },
      JWT_SECRET,
      { expiresIn: JWT_LIFETIME }
    );

    return res.status(200).json({
      message: err.message,
    });
  } catch (err) {
    return res.status(500)({
      message: err.message,
    });
  }
};

export { register, login };
