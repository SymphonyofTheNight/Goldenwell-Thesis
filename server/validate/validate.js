import joi from 'joi';

export const validate = (ClientModels) => {
    const schema = joi.object({

        _id: joi.string()
        .min(8)
        .max(100),

        fullname: joi.string()
        .min(8)
        .max(50)
        .required()
        .pattern(new RegExp('[A-z][A-z][A-z]')),

        address: joi.string()
        .min(10)
        .max(99)
        .required(),

        email: joi.string()
        .required(),

        google_id: joi.string()
        .min(8)
        .max(50),

        birthday: joi.string()
        .required(),

        number: joi.string()
        .min(6)
        .max(11)
        .required(),

        gender: joi.string()
        .required(),

        username: joi.string()
        .min(4)
        .max(50)
        .required(),

        password: joi.string()
        .min(8)
        .max(50),

        confirm: joi.string()
        .min(8)
        .max(50),

    })
    return schema.validate(ClientModels);
}