import prisma from "../prisma/client.js";

const createWellness = async (req, res) => {
    try {
        await prisma.wellness.create({
            data: {
                sleep: req.body.sleep,
                stress: req.body.stress,
                fatigue: req.body.fatigue,
                muscleSoreness: req.body.muscleSoreness,
                userId: req.user.id
            }
        })
        const newWellness = await prisma.wellness.findMany();
    
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
        const wellness = await prisma.wellness.findMany();

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
        const wellness = await prisma.wellness.findUnique({
            where: { id: req.params.id },
        });

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
        let wellness = await prisma.wellness.findUnique({
            where: { id: req.params.id },
        });

        if(!wellness) {
            return res.status(404).json({
                message: `No wellness data with id: ${req.params.id} found`,
            });
        }

        wellness = prisma.wellness.update({
            where: { id: req.params.id },
            data: {
                sleep: req.body.sleep,
                stress: req.body.stress,
                fatigue: req.body.fatigue,
                muscleSoreness: req.body.muscleSoreness,
            }
        });

        return res.status(200).json({
            message: `Wellness data with id: ${req.params.id} found`,
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
        const wellness = await prisma.wellness.findUnique({
            where: { id: req.params.id },
        });

        if(!wellness) {
            return res.status(404).json({
                message: `Wellness data with id: ${req.params.id} not found`,
            });
        }

        await prisma.wellness.delete({
            where: { id: req.params.id },
        })

        return res.status(200).json({
            message: `Wellness data with id: ${req.params.id} found`,
        });
    } catch(err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

export { createWellness, getWellness, getWellnessID, updateWellness, deleteWellness };