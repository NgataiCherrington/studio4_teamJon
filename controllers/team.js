import prisma from "../prisma/client.js";

const createTeam = async (req, res) => {
  try {
    await prisma.team.create({
      data: {
        teamName: req.body.teamName,
        userId: req.user.id,
      },
    });
    const newTeam = await prisma.team.findMany();

    return res.status(201).json({
      message: "Team created successfully",
      data: newTeam,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getTeams = async (req, res) => {
  try {
    const teams = await prisma.team.findMany();

    if (!teams) {
      return res.status(404).json({
        message: "No teams found",
      });
    }

    return res.status(200).json({
      data: teams,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getTeamID = async (req, res) => {
  try {
    const team = await prisma.team.findUnique({
      where: { id: req.params.id },
    });

    if (!team) {
      return res.status(404).json({
        message: `No team with id: ${req.params.id} found`,
      });
    }

    return res.status(200).json({
      data: team,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const updateTeam = async (req, res) => {
  try {
    let team = await prisma.team.findUnique({
      where: { id: req.params.id },
    });

    if (!team) {
      return res.status(404).json({
        message: `No team with id: ${req.params.id} found`,
      });
    }

    team = await prisma.team.update({
      where: { id: req.params.id },
      data: {
        teamName: req.body.teamName,
      },
    });

    return res.status(200).json({
      message: `Team with id: ${req.params.id} successfully updated`,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const deleteTeam = async (req, res) => {
  try {
    const team = await prisma.team.findUnique({
      where: { id: req.params.id },
    });

    if (!team) {
      return res.status(404).json({
        message: `Team with id: ${req.params.id} not found`,
      });
    }

    await prisma.team.delete({
      where: { id: req.params.id },
    });

    return res.status(200).json({
      message: `Team with id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export { createTeam, getTeams, getTeamID, updateTeam, deleteTeam };
