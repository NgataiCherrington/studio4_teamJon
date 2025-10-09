import prisma from "../prisma/client.js";

const createTeam = async (req, res) => {
    try {
        await prisma.team.create({
            data: {
                teamName: req.body.teamName,
            },
        });
        const newTeam = await prisma.team.findMany();
    
        return res.status(201).json({
            message: "Team created successfully",
            data: newTeam,
        });
    } catch(err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

