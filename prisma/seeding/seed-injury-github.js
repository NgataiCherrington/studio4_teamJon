import fetch from "node-fetch";

import prisma from "../client.js";

import { validatePostInjury } from "../../middleware/validation/injury.js";

// Simulate an Express-like request and response for validation
const validateInjury = (injury) => {
  const req = { body: injury };
  const res = {
    status: (code) => ({
      json: (message) => {
        console.log(message);
        process.exit(1);
      },
    }),
  };

  validatePostInjury(req, res, () => {}); // Pass an empty function since we're not using next()
};

const seedInjuriesFromGitHub = async () => {
  try {
    await prisma.injury.deleteMany();
    const gistUrl = "https://gist.githubusercontent.com/NgataiCherrington/fae56fd6321d5ee271287b3c4d7a7ead/raw/3add0ab20e38db4dbe14c35aedc915c826bbb30e/chernj1-seeding-injury.json"; // Replace <GIST_RAW_URL> with the raw URL of your GitHub Gist
    const response = await fetch(gistUrl);
    const injuryData = await response.json();
    const users = await prisma.user.findMany();
    if (users.length < injuryData.length) {
      console.warn("Warning: Less users than injury records")
    }

    const data = await Promise.all(
      injuryData.map(async (injury, index) => {
        const injuryDataWithId = { ...injury,
          userId: users[index % users.length].id,
        };
                
        validateInjury(injuryDataWithId);

        return injuryDataWithId;
      })
    );

    await prisma.injury.createMany({
      data,
      skipDuplicates: true, // Prevent duplicate entries if the email already exists
    });

    console.log("Injury data successfully seeded from GitHub Gist");
  } catch (err) {
    console.log(err.message);
  }
};

seedInjuriesFromGitHub();