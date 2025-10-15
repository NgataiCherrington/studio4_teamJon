import fetch from "node-fetch";

import prisma from "../client.js";

import { validatePostUser } from "../../middleware/validation/user.js";

// Simulate an Express-like request and response for validation
const validateUser = (user) => {
  const req = { body: user };
  const res = {
    status: (code) => ({
      json: (message) => {
        console.log(message);
        process.exit(1);
      },
    }),
  };

  validatePostUser(req, res, () => {}); // Pass an empty function since we're not using next()
};

const seedUsersFromGitHub = async () => {
  try {
    await prisma.user.deleteMany();
    const gistUrl = "https://gist.githubusercontent.com/NgataiCherrington/6a396ef73733fc994f31151940fd9fe7/raw/446816feac50290e21547aa78114cf93184747f0/chernj1-seeding-users.json"; // Replace <GIST_RAW_URL> with the raw URL of your GitHub Gist
    const response = await fetch(gistUrl);
    const userData = await response.json();

    const data = await Promise.all(
        userData.map(async (user) => {
        validateUser(user);
        return { ...user };
      })
    );

    await prisma.user.createMany({
      data,
      skipDuplicates: true, // Prevent duplicate entries if the email already exists
    });

    console.log("Users successfully seeded from GitHub Gist");
  } catch (err) {
    console.log(err.message);
  }
};

seedUsersFromGitHub();