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
      firstName: joi.string().min(2).max(50).required(),
      lastName: joi.string().min(2).max(50).required(),
      address: joi.string().min(2).max(100).required(),
      isAdmin: joi.bool(),
    });
    joi.validate(req.body, schema, (err) => {
      if (err) res.send(err.message);
      else next();
    });
  },
  createAd: (req, res, next) => {
    const schema = joi.object().keys({
      owner: joi.number().required(),
      condition: joi.string().min(2).max(50).required(),
      status: joi.string().min(2).max(50).required(),
      price: joi.number().required(),
      brand: joi.string().min(2).max(50).required(),
      model: joi.string().min(2).max(50).required(),
      body_type: joi.string().min(2).max(50).required(),
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
      carId: joi.number().required(),
      price: joi.number().required(),
      price_offer: joi.number().required(),
      status: joi.string().min(2).max(50).required(),
    });
    joi.validate(req.body, schema, (err) => {
      if (err) res.send(err.message);
      else next();
    });
  },
  updateOrder: (req, res, next) => {
    const schema = joi.object().keys({
      price_offer: joi.number().required(),
    });
    joi.validate(req.body, schema, (err) => {
      if (err) res.send(err.message);
      else next();
    });
  },
  createFlag: (req, res, next) => {
    const schema = joi.object().keys({
      carId: joi.number().required(),
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
