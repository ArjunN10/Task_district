const joi=require("joi")

const joiUserSchema = joi.object({
    name: joi.string(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    phoneNumber:joi.string(),
    date_of_birth:joi.string(),
    assembly:joi.string(),
    constituency:joi.string(),
    district:joi.string(),
    panchayath:joi.string(),
    municipality:joi.string(),
    corporation:joi.string()
});


module.exports={joiUserSchema}