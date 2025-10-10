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
    const injuries = await injuryRepository.findAll();
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
