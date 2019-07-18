import joi from 'joi';

const validator = {
  userSignIn: (req, res, next) => {
    const schema = joi.object().keys({
      email: joi.string().trim().email().required(),
      password: joi.string().min(5).max(50).required(),
    });
    joi.validate(req.body, schema, (err) => {
      if (err) res.send(err.message);
      else next();
    });
  },
  userSignUp: (req, res, next) => {
    const schema = joi.object().keys({
      email: joi.string().trim().email().required(),
      password: joi.string().min(5).max(50).required(),
      first_name: joi.string().min(2).max(50).required(),
      last_name: joi.string().min(2).max(50).required(),
      address: joi.string().min(2).max(100).required(),
      is_admin: joi.bool(),
    });
    joi.validate(req.body, schema, (err) => {
      if (err) res.send(err.message);
      else next();
    });
  },
  createAd: (req, res, next) => {
    const schema = joi.object().keys({
      owner: joi.number().required(),
      state: joi.string().min(2).max(50).required(),
      status: joi.string().min(2).max(50).required(),
      price: joi.number().required(),
      manufacturer: joi.string().min(2).max(50).required(),
      model: joi.string().min(2).max(50).required(),
      body_type: joi.string().min(2).max(50).required(),
      photo: joi.array().min(1).items(joi.string()).required(),
    });
    joi.validate(req.body, schema, (err) => {
      if (err) res.send(err.message);
      else next();
    });
  },
  updateAd: (req, res, next) => {
    const schema = joi.object().keys({
      status: joi.string().min(2).max(50),
      price: joi.number(),
    });
    joi.validate(req.body, schema, (err) => {
      if (err) res.send(err.message);
      else next();
    });
  },
  createOrder: (req, res, next) => {
    const schema = joi.object().keys({
      buyer: joi.number().required(),
      car_id: joi.number().required(),
      price: joi.number().required(),
      amount: joi.number().required(),
      status: joi.string().min(2).max(50).required(),
    });
    joi.validate(req.body, schema, (err) => {
      if (err) res.send(err.message);
      else next();
    });
  },
  updateOrder: (req, res, next) => {
    const schema = joi.object().keys({
      amount: joi.number().required(),
    });
    joi.validate(req.body, schema, (err) => {
      if (err) res.send(err.message);
      else next();
    });
  },
  createFlag: (req, res, next) => {
    const schema = joi.object().keys({
      car_id: joi.number().required(),
      reason: joi.string().min(5).max(50).required(),
      description: joi.string().min(5).max(50),
    });
    joi.validate(req.body, schema, (err) => {
      if (err) res.send(err.message);
      else next();
    });
  },
};

export default validator;
