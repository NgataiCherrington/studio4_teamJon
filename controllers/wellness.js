import prisma from "../prisma/client";

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