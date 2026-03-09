import fetch from "node-fetch";

import prisma from "../client.js";

import { validatePostWellness } from "../../middleware/validation/wellness.js";

// Simulate an Express-like request and response for validation
const validateWellness = (wellness) => {
  const req = { body: wellness };
  const res = {
    status: (code) => ({
      json: (message) => {
        console.log(message);
        process.exit(1);
      },
    }),
  };

  validatePostWellness(req, res, () => {}); // Pass an empty function since we're not using next()
};

const seedWellnessFromGitHub = async () => {
  try {
    await prisma.wellness.deleteMany();
    const gistUrl = "https://gist.githubusercontent.com/NgataiCherrington/908b3e581702f089e66985fed16459ee/raw/cc12a437e2eb0f00eb7cc97094f08dcae5e2201a/chernj1-seeding-wellness.json"; // Replace <GIST_RAW_URL> with the raw URL of your GitHub Gist
    const response = await fetch(gistUrl);
    const wellnessData = await response.json();
    const users = await prisma.user.findMany();
    if (users.length < wellnessData.length) {
      console.warn("Warning: Less users than wellness records")
    }

    const data = await Promise.all(
      wellnessData.map(async (wellness, index) => {
        const wellnessDataWithId = { ...wellness,
          userId: users[index % users.length].id,
        };

        validateWellness(wellnessDataWithId);

        return wellnessDataWithId;
      })
    );

    await prisma.wellness.createMany({
      data,
      skipDuplicates: true, // Prevent duplicate entries if the email already exists
    });

    console.log("Wellness data successfully seeded from GitHub Gist");
  } catch (err) {
    console.log(err.message);
  }
};

seedWellnessFromGitHub();