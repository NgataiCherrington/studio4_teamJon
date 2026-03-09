import fetch from "node-fetch";

import prisma from "../client.js";

import { validatePostTeam } from "../../middleware/validation/team.js";

// Simulate an Express-like request and response for validation
const validateTeam = (team) => {
  const req = { body: team };
  const res = {
    status: (code) => ({
      json: (message) => {
        console.log(message);
        process.exit(1);
      },
    }),
  };

  validatePostTeam(req, res, () => {}); // Pass an empty function since we're not using next()
};

const seedTeamsFromGitHub = async () => {
  try {
    await prisma.team.deleteMany();
    const gistUrl = "https://gist.githubusercontent.com/NgataiCherrington/54aab85ef1f654637406818e2ff1116f/raw/e251dfce2a9335a4fb37bafa1a90437004caec81/chernj1-seeding-teams.json"; // Replace <GIST_RAW_URL> with the raw URL of your GitHub Gist
    const response = await fetch(gistUrl);
    const teamData = await response.json();
    const users = await prisma.user.findMany();
    if (users.length < teamData.length) {
      console.warn("Warning: Less users than team records")
    }

    const data = await Promise.all(
      teamData.map(async (team, index) => {
        const teamDataWithId = { ...team,
          userId: users[index % users.length].id,
        };
                
        validateTeam(teamDataWithId);

        return teamDataWithId;
      })
    );

    await prisma.team.createMany({
      data,
      skipDuplicates: true, // Prevent duplicate entries if the email already exists
    });

    console.log("Team data successfully seeded from GitHub Gist");
  } catch (err) {
    console.log(err.message);
  }
};

seedTeamsFromGitHub();