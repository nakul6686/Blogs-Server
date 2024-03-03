const Joi = require('joi');


const validateComment = Joi.object({
    text:Joi.string().required().min(5),
    user: Joi.string().required(),
    blog: Joi.string().required()

})


module.exports = validateComment;