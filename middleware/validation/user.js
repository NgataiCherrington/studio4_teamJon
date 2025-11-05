import Joi from "joi";

const validatePostUser = (req, res, next) => {
    const userSchema = Joi.object({
        firstName: Joi.string().min(3).max(100).required().messages({
            "string.base": "firstName should be a string",
            "string.empty": "firstName cannot be empty",
            "string.min": "firstName should have a minimum length of {#limit}",
            "string.max": "firstName should have a maximum  length of {#limit}",
            "any.required": "firstName is required"
        }),
        lastName: Joi.string().min(3).max(100).required().messages({
            "string.base": "lastName should be a string",
            "string.empty": "lastName cannot be empty",
            "string.min": "lastName should have a minimum length of {#limit}",
            "string.max": "lastName should have a maximum  length of {#limit}",
            "any.required": "lastName is required"
        }),
        phoneNumber: Joi.string().min(3).max(100).required().messages({
            "string.base": "phoneNumber should be a string",
            "string.empty": "phoneNumber cannot be empty",
            "string.min": "phoneNumber should have a minimum length of {#limit}",
            "string.max": "phoneNumber should have a maximum  length of {#limit}",
            "any.required": "phoneNumber is required"
        }),
        dob: Joi.string().min(3).max(100).required().messages({
            "string.base": "dob should be a string",
            "string.empty": "dob cannot be empty",
            "string.min": "dob should have a minimum length of {#limit}",
            "string.max": "dob should have a maximum  length of {#limit}",
            "any.required": "dob is required"
        }),
        email: Joi.string().min(3).max(100).required().messages({
            "string.base": "email should be a string",
            "string.empty": "email cannot be empty",
            "string.min": "email should have a minimum length of {#limit}",
            "string.max": "email should have a maximum  length of {#limit}",
            "any.required": "email is required"
        }),
        password: Joi.string().min(3).max(100).required().messages({
            "string.base": "password should be a string",
            "string.empty": "password cannot be empty",
            "string.min": "password should have a minimum length of {#limit}",
            "string.max": "password should have a maximum  length of {#limit}",
            "any.required": "password is required"
        }),
        role: Joi.string().min(3).max(100).required().messages({
            "string.base": "role should be a string",
            "string.empty": "role cannot be empty",
            "string.min": "role should have a minimum length of {#limit}",
            "string.max": "role should have a maximum  length of {#limit}",
            "any.required": "role is required"
        }),
    });

    const { error } = userSchema.validate(req.body, {
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

const validatePutUser = (req, res, next) => {
    const userSchema = Joi.object({
        firstName: Joi.string().min(3).max(100).optional().messages({
            "string.base": "firstName should be a string",
            "string.empty": "firstName cannot be empty",
            "string.min": "firstName should have a minimum length of {#limit}",
            "string.max": "firstName should have a maximum  length of {#limit}",
        }),
        lastName: Joi.string().min(3).max(100).optional().messages({
            "string.base": "lastName should be a string",
            "string.empty": "lastName cannot be empty",
            "string.min": "lastName should have a minimum length of {#limit}",
            "string.max": "lastName should have a maximum  length of {#limit}",
        }),
        phoneNumber: Joi.string().min(3).max(100).optional().messages({
            "string.base": "phoneNumber should be a string",
            "string.empty": "phoneNumber cannot be empty",
            "string.min": "phoneNumber should have a minimum length of {#limit}",
            "string.max": "phoneNumber should have a maximum  length of {#limit}",
        }),
        dob: Joi.string().min(3).max(100).optional().messages({
            "string.base": "dob should be a string",
            "string.empty": "dob cannot be empty",
            "string.min": "dob should have a minimum length of {#limit}",
            "string.max": "dob should have a maximum  length of {#limit}",
        }),
        email: Joi.string().min(3).max(100).optional().messages({
            "string.base": "email should be a string",
            "string.empty": "email cannot be empty",
            "string.min": "email should have a minimum length of {#limit}",
            "string.max": "email should have a maximum  length of {#limit}",
        }),
        password: Joi.string().min(3).max(100).optional().messages({
            "string.base": "password should be a string",
            "string.empty": "password cannot be empty",
            "string.min": "password should have a minimum length of {#limit}",
            "string.max": "password should have a maximum  length of {#limit}",
        }),
        role: Joi.string().min(3).max(100).optional().messages({
            "string.base": "role should be a string",
            "string.empty": "role cannot be empty",
            "string.min": "role should have a minimum length of {#limit}",
            "string.max": "role should have a maximum  length of {#limit}",
        }),
    }).min(1);

    const { error } = userSchema.validate(req.body, {
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

export { validatePostUser, validatePutUser };
