import prisma from "../prisma/client.js";
import teamRepository from "../repositories/team.js";

const createTeam = async (req, res) => {
  try {
    await teamRepository.create(req.body);
    const newTeam = await teamRepository.findAll();
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
    // Deconstruct query parameters with default values for filtering and pagination
    const {
      teamName,
      sortBy = "id",
      sortOrder = "asc",
      page = 1,
      pageSize = 10,
    } = req.query;

    // Build a filters object based on query parameters
    const filters = {};
    if (teamName) filters.teamName = teamName;

    // Validate and normalize sort order, Default to 'asc' if invalid
    const validSortOrders = ["asc", "desc"];
    const order = validSortOrders.includes(sortOrder.toLowerCase())
      ? sortOrder.toLowerCase()
      : "asc";

    // Validate and normalize sort field, Default to 'id' if invalid
    const validSortFields = ["id", "teamName"];
    const fields = validSortFields.includes(sortBy.toLowerCase())
      ? sortBy.toLowerCase()
      : "id";

    const teams = await teamRepository.findAll(
      filters,
      fields,
      order,
      page,
      pageSize
    );
    // const teams = await teamRepository.findAll();
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
    const team = await teamRepository.findById(req.params.id);
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
    let team = await teamRepository.findById(req.params.id);
    if (!team) {
      return res.status(404).json({
        message: `No team with id: ${req.params.id} found`,
      });
    }
    team = await teamRepository.update(req.params.id, req.body);
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
    const team = await teamRepository.findById(req.params.id);
    if (!team) {
      return res.status(404).json({
        message: `Team with id: ${req.params.id} not found`,
      });
    }
    await teamRepository.delete(req.params.id);
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
