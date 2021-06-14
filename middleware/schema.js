const Joi = require('joi');

module.exports = {
    postCreateValidation(data) {
        const schema = Joi.object({
            title: Joi.string().trim().min(3).required(),
            lead: Joi.string().trim().min(3).required(),
            content: Joi.string().trim().min(3).required()
        });
        return schema.validate(data);
    },
    postUpdateValidation(data) {
        const schema = Joi.object({
            title: Joi.string().trim().min(3).optional(),
            lead: Joi.string().trim().min(3).optional(),
            content: Joi.string().trim().min(3).optional()
        });
        return schema.validate(data);
    },
    userCreateValidation(data) {
        const schema = Joi.object({
            email: Joi.string().trim().email().required(),
            password: Joi.string().trim().min(8).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
        });
        return schema.validate(data);
    },


}


