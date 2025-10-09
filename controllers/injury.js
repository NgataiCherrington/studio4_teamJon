import prisma from "../prisma/client.js";

const createInjury = async (req, res) => {
    try {
        const createInjury = await prisma.injury.create({
            injuryCode: req.body.injuryCode,
            timeOfInjury: req.body.timeOfInjury,
            description: req.body.description
        });

        const newInjury = await prisma.injury.findMany();

        return res.status(200).json({
            message: "Injury data created successfully",
            data: newInjury,
        });
    } catch(err){
        return res.status(500).json({
            message: err.message,
        });
    }
};

const getInjuries = async (req, res) => {
    try {
        const injuries = await prisma.injury.findMany();

        if(!injuries) {
            return res.status(404).json({
                message: "No teams found",
            });
        }

        return res.status(200).json({
            data: injuries,
        });
    } catch(err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

const getInjuryID = async (req, res) => {
    try {
        const injury = await prisma.injury.findUnique({
            where: { id: req.params.id },
        });

        if(!injury) {
            return res.status(404).json({
                message: `No injury with id: ${req.params.id } found`,
            });
        }

        return res.status(200).json({
            data: injury,
        });
    } catch(err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

const updateInjury = async (req, res) => {
    try {
        let injury = await prisma.injury.findUnique({
            where: { id: req.params.id },
        });

        if(!injury) {
            return res.status(404).json({
                message: `No injury with id: ${req.params.id} found`
            });
        }

        await prisma.injury.update({
            where: { id: req.params.id},
            data: {
                injuryCode: req.body.injuryCode,
                timeOfInjury: req.body.timeOfInjury,
                description: req.body.description,
            },
        });

        return res.status(200).json({
            message: `Injury data with id: ${req.params.id} successfully updated`,
        });
    } catch(err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

const deleteInjury = async (req, res) => {
    try {
        const injury = await prisma.injury.findUnique({
            where: { id: req.params.id },
        });

        if(!injury) {
            return res.status(404).json({
                message: `No injury with id: ${req.params.id} found`,
            });
        }

        await prisma.injury.delete({
            where: { id: req.params.id },
        })

        return res.status(200).json({
            message: `Injury with id: ${req.params.id } successfully deleted`,
        });
    } catch(err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

export { createInjury, getInjuries, getInjuryID, updateInjury, deleteInjury };