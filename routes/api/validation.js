const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const schemaSuperhero = Joi.object({
  nickname: Joi.string().alphanum().min(1).max(20).required(),
  real_name: Joi.string().alphanum().min(1).max(20).required(),
  origin_description: Joi.string().min(1).max(300).required(),
  superpowers: Joi.string().min(1).max(200).required(),
  catch_phrase: Joi.string().min(1).max(100).required(),
  images: Joi.array().items(Joi.string().required()),
});

const schemaImagesSuperhero = Joi.object({
  images: Joi.array().items(Joi.string().required()),
});

const schemaId = Joi.object({
  id: Joi.objectId().required(),
});

const validate = async (schema, obj, res, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (err) {
    res.status(400).json({
      status: 'error',
      code: 404,
      message: `Field ${err.message.replace(/"/g, '')}`,
    });
  }
};

module.exports.validateSuperhero = async (req, res, next) => {
  return await validate(schemaSuperhero, req.body, res, next);
};

module.exports.validateImagesSuperhero = async (req, res, next) => {
  return await validate(schemaImagesSuperhero, req.body, res, next);
};

module.exports.validateId = async (req, res, next) => {
  return await validate(schemaId, req.params, res, next);
};
