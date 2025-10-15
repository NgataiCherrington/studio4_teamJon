import prisma from "../prisma/client.js";
import injuryRepository from "../repositories/injury.js";

const createInjury = async (req, res) => {
  try {
    await injuryRepository.create(req.body);
    const newInjury = await injuryRepository.findAll();
    return res.status(201).json({
      message: "Injury data created successfully",
      data: newInjury,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getInjuries = async (req, res) => {
  try {
    // Deconstruct query parameters with default values for filtering and pagination
    const {
      injuryCode,
      timeOfInjury,
      description,
      sortBy = "id",
      sortOrder = "asc",
      page = 1,
      pageSize = 10,
    } = req.query;

    // Build a filters object based on query parameters
    const filters = {};
    if (injuryCode) filters.injuryCode = injuryCode;
    if (timeOfInjury) filters.timeOfInjury = timeOfInjury;
    if (description) filters.description = description;

    // Validate and normalize sort order, Default to 'asc' if invalid
    const validSortOrders = ["asc", "desc"];
    const order = validSortOrders.includes(sortOrder.toLowerCase())
      ? sortOrder.toLowerCase()
      : "asc";

    // Validate and normalize sort field, Default to 'id' if invalid
    const validSortFields = ["id", "injuryCode", "timeOfInjury", "description"];
    const fields = validSortFields.includes(sortBy.toLowerCase())
      ? sortBy.toLowerCase()
      : "id";

    const injuries = await injuryRepository.findAll(
      filters,
      fields,
      order,
      page,
      pageSize
    );

    if (!injuries) {
      return res.status(404).json({
        message: "No teams found",
      });
    }
    return res.status(200).json({
      data: injuries,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getInjuryID = async (req, res) => {
  try {
    const injury = await injuryRepository.findById(req.params.id);
    if (!injury) {
      return res.status(404).json({
        message: `No injury with id: ${req.params.id} found`,
      });
    }
    return res.status(200).json({
      data: injury,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const updateInjury = async (req, res) => {
  try {
    let injury = await injuryRepository.findById(req.params.id);
    if (!injury) {
      return res.status(404).json({
        message: `No injury with id: ${req.params.id} found`,
      });
    }
    injury = injuryRepository.update(req.params.id, req.body);
    return res.status(200).json({
      message: `Injury data with id: ${req.params.id} successfully updated`,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const deleteInjury = async (req, res) => {
  try {
    const injury = await injuryRepository.findById(req.params.id);
    if (!injury) {
      return res.status(404).json({
        message: `No injury with id: ${req.params.id} found`,
      });
    }
    await injuryRepository.delete(req.params.id);
    return res.status(200).json({
      message: `Injury with id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export { createInjury, getInjuries, getInjuryID, updateInjury, deleteInjury };
