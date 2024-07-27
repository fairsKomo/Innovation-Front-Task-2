const joi = require('joi');

const validateReg = (data) => {
    const studentSchema = joi.object({
        firstName: joi.string().required(),
        lastName: joi.string().required(),
        email: joi.string().email().required(),
        username: joi.string().alphanum().required(),
        password: joi.string().min(8).required(),
        role: joi.string().valid('student', 'admin').default('student'),
        grade: joi.number().min(0).max(100).default(0),
        courses: joi.array().items(joi.string()).default([0])

    });

    const {error, value} = studentSchema.validate(data);

    return {error, value};
}

module.exports = {
    validateReg
}