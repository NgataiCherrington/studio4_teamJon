import prisma from "../prisma/client.js";
import wellnessRepository from "../repositories/wellness.js";

const createWellness = async (req, res) => {
    try {
        await wellnessRepository.create(req.body);
        const newWellness = await wellnessRepository.findAll();
        return res.status(201).json({
            message: "Wellness data created successfully",
            data: newWellness,
        });
    } catch(err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

const getWellness = async (req, res) => {
    try {
        const wellness = await wellnessRepository.findAll();
        if(!wellness) {
            return res.status(404).json({
                message: "No wellness data found",
            });
        }
        return res.status(200).json({
            data: wellness,
        });
    } catch(err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

const getWellnessID = async (req, res) => {
    try {
        const wellness = await wellnessRepository.findById(req.params.id);
        if(!wellness) {
            return res.status(404).json({
                message: `No wellness data with id: ${req.params.id} found`,
            });
        }
        return res.status(200).json({
            data: wellness,
        });
    } catch(err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

const updateWellness = async (req, res) => {
    try {
        let wellness = await wellnessRepository.findById(req.params.id);
        if(!wellness) {
            return res.status(404).json({
                message: `No wellness data with id: ${req.params.id} found`,
            });
        }
        wellness = wellnessRepository.update(req.params.id, req.body);
        return res.status(200).json({
            message: `Wellness data with id: ${req.params.id} successfully updated`,
            data: wellness,
        });
    } catch(err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

const deleteWellness = async (req, res) => {
    try {
        const wellness = await wellnessRepository.findById(req.params.id);
        if(!wellness) {
            return res.status(404).json({
                message: `Wellness data with id: ${req.params.id} not found`,
            });
        }
        await wellnessRepository.delete(req.params.id);
        return res.status(200).json({
            message: `Wellness data with id: ${req.params.id} successfully deleted`,
        });
    } catch(err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

export { createWellness, getWellness, getWellnessID, updateWellness, deleteWellness };