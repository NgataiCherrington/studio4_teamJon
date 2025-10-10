import Joi from "joi";

const validatePostTeam = (req, res, next) => {
    const teamSchema = Joi.object({
        teamName: Joi.string().min(3).max(100).required().messages({
            "string.base": "teamName should be a string",
            "string.empty": "teamName cannot be empty",
            "string.min": "teamName should have a minimum length of {#limit}",
            "string.max": "teamName should have a maximum  length of {#limit}",
            "any.required": "teamName is required"
        }),   
    });

    const { error } = teamSchema.validate(req.body, {
        abortEarly: false,
        convert: false,
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

const validatePutTeam = (req, res, next) => {
    const userSchema = Joi.object({
        teamName: Joi.string().min(3).max(100).required().messages({
            "string.base": "teamName should be a string",
            "string.empty": "teamName cannot be empty",
            "string.min": "teamName should have a minimum length of {#limit}",
            "string.max": "teamName should have a maximum  length of {#limit}",
            "any.required": "teamName is required"
        }),
    }).min(1);

    const { error } = teamSchema.validate(req.body, {
        abortEarly: false,
        convert: false,
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

export { validatePostTeam, validatePutTeam };
