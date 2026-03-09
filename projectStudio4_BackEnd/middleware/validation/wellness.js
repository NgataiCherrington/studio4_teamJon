import Joi from "joi";

const validatePostWellness = (req, res, next) => {
  const wellnessSchema = Joi.object({
    sleep: Joi.number().integer().min(0).max(24).required().messages({
      "number.base": "sleep should be a integer",
      "number.empty": "sleep cannot be empty",
      "number.min": "sleep should have a minimum length of {#limit}",
      "number.max": "sleep should have a maximum  length of {#limit}",
      "any.required": "sleep is required",
    }),
    stress: Joi.number().integer().min(0).max(10).required().messages({
      "number.base": "stress should be a integer",
      "number.empty": "stress cannot be empty",
      "number.min": "stress should have a minimum length of {#limit}",
      "number.max": "stress should have a maximum  length of {#limit}",
      "any.required": "stress is required",
    }),
    fatigue: Joi.number().integer().min(0).max(10).required().messages({
      "number.base": "fatigue should be a integer",
      "number.empty": "fatigue cannot be empty",
      "number.min": "fatigue should have a minimum length of {#limit}",
      "number.max": "fatigue should have a maximum  length of {#limit}",
      "any.required": "fatigue is required",
    }),
    muscleSoreness: Joi.number().integer().min(0).max(10).required().messages({
      "number.base": "muscleSoreness should be a integer",
      "number.empty": "muscleSoreness cannot be empty",
      "number.min": "muscleSoreness should have a minimum length of {#limit}",
      "number.max": "muscleSoreness should have a maximum  length of {#limit}",
      "any.required": "muscleSoreness is required",
    }),
    userId: Joi.string().uuid().required().messages({
        "string.base": "userId should be a string",
        "string.empty": "userId cannot be empty",
        "any.required": "userId is required",
      })
  });

  const { error } = wellnessSchema.validate(req.body, {
    abortEarly: false,
    convert: false,
  });

  if (error) {
    const formattedErrors = error.details.map(({ message, type }) => ({
      message,
      type,
    }));
    return res.status(409).json({ errors: formattedErrors });
  }

  next();
};

const validatePutWellness = (req, res, next) => {
  const wellnessSchema = Joi.object({
    sleep: Joi.number().integer().min(0).max(24).required().messages({
      "number.base": "sleep should be a integer",
      "number.empty": "sleep cannot be empty",
      "number.min": "sleep should have a minimum length of {#limit}",
      "number.max": "sleep should have a maximum  length of {#limit}",
      "any.required": "sleep is required",
    }),
    stress: Joi.number().integer().min(0).max(10).required().messages({
      "number.base": "stress should be a integer",
      "number.empty": "stress cannot be empty",
      "number.min": "stress should have a minimum length of {#limit}",
      "number.max": "stress should have a maximum  length of {#limit}",
      "any.required": "stress is required",
    }),
    fatigue: Joi.number().integer().min(0).max(10).required().messages({
      "number.base": "fatigue should be a integer",
      "number.empty": "fatigue cannot be empty",
      "number.min": "fatigue should have a minimum length of {#limit}",
      "number.max": "fatigue should have a maximum  length of {#limit}",
      "any.required": "fatigue is required",
    }),
    muscleSoreness: Joi.number().integer().min(0).max(10).required().messages({
      "number.base": "muscleSoreness should be a integer",
      "number.empty": "muscleSoreness cannot be empty",
      "number.min": "muscleSoreness should have a minimum length of {#limit}",
      "number.max": "muscleSoreness should have a maximum  length of {#limit}",
      "any.required": "muscleSoreness is required",
    }),
    userId: Joi.string().uuid().required().messages({
      "string.base": "userId should be a string",
      "string.empty": "userId cannot be empty",
      "any.required": "userId is required",
    }),
  }).min(1);

  const { error } = wellnessSchema.validate(req.body, {
    abortEarly: false,
    convert: false,
  });

  if (error) {
    const formattedErrors = error.details.map(({ message, type }) => ({
      message,
      type,
    }));
    return res.status(409).json({ errors: formattedErrors });
  }

  next();
};

export { validatePostWellness, validatePutWellness };
