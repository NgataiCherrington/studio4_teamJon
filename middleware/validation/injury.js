import Joi from "joi";

const validatePostInjury = (req, res, next) => {
    const injurySchema = Joi.object({
        injuryCode: Joi.string().min(3).max(100).required().messages({
            "string.base": "injuryCode should be a string",
            "string.empty": "injuryCode cannot be empty",
            "string.min": "injuryCode should have a minimum length of {#limit}",
            "string.max": "injuryCode should have a maximum  length of {#limit}",
            "any.required": "injuryCode is required"
        }),
        timeOfInjury: Joi.date().iso().required().messages({
            "date.base": "timeOfInjury should be a valid date",
            "date.empty": "timeOfInjury cannot be empty",
            "date.format": "timeOfInjury should be in ISO 8601 format (2025-10-10T09:30:00.000Z)",
            "any.required": "timeOfInjury is required"
        }), 
        description: Joi.string().min(3).max(100).required().messages({
            "string.base": "description should be a string",
            "string.empty": "description cannot be empty",
            "string.min": "description should have a minimum length of {#limit}",
            "string.max": "description should have a maximum  length of {#limit}",
            "any.required": "description is required"
        }),
        user: Joi.object({
                connect: Joi.object({
                    id: Joi.string().uuid().required(),
                }).required()
            }).required()
    });

    const { error } = injurySchema.validate(req.body, {
        abortEarly: false,
        convert: true,
    });

    if(error) {
        const formattedErrors = error.details.map(({ message, type }) => ({
            message,
            type,
        })) ;
        return res.status(409).json({ errors: formattedErrors });
    }

    next();
}

const validatePutInjury = (req, res, next) => {
    const injurySchema = Joi.object({
        injuryCode: Joi.string().min(3).max(100).required().messages({
            "string.base": "injuryCode should be a string",
            "string.empty": "injuryCode cannot be empty",
            "string.min": "injuryCode should have a minimum length of {#limit}",
            "string.max": "injuryCode should have a maximum  length of {#limit}",
            "any.required": "injuryCode is required"
        }),
        timeOfInjury: Joi.date().iso().required().messages({
            "date.base": "timeOfInjury should be a valid date",
            "date.empty": "injuryCode cannot be empty",
            "date.format": "timeOfInjury should be in ISO 8601 format (2025-10-10T09:30:00.000Z)",
            "any.required": "timeOfInjury is required"
        }), 
        description: Joi.string().min(3).max(100).required().messages({
            "string.base": "description should be a string",
            "string.empty": "description cannot be empty",
            "string.min": "description should have a minimum length of {#limit}",
            "string.max": "description should have a maximum  length of {#limit}",
            "any.required": "description is required"
        }),
        user: Joi.object({
                connect: Joi.object({
                    id: Joi.string().uuid().required(),
                }).required()
            }).required()
    }).min(1);

    const { error } = injurySchema.validate(req.body, {
        abortEarly: false,
        convert: true,
    });

    if(error) {
        const formattedErrors = error.details.map(({ message, type }) => ({
            message,
            type,
        })) ;
        return res.status(409).json({ errors: formattedErrors });
    }

    next();
}

export { validatePostInjury, validatePutInjury };
