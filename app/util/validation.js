const { check } = require("express-validator");
const { validationResult } = require("express-validator/check");

const checkString = (param, name) => {
  return check(param, `Please enter a correct ${name}`).not().isEmpty();
};

const checkEmail = () => {
  return check("email", "Please enter a valid email").isEmail();
};

const checkPassword = () => {
  return check("password", "Please enter a valid password").isLength({
    min: 6,
  });
};

const handleValidationErrors = (res, errors) => {
  return res.status(400).json({
    errors: errors.array(),
  });
};

const checkValidations = (req) => {
  return validationResult(req);
};

module.exports = {
  checkString,
  checkEmail,
  checkPassword,
  handleValidationErrors,
  checkValidations,
};
