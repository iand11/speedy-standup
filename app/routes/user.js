const express = require("express");
const { check, validationResult } = require("express-validator/check");
const router = express.Router();
const auth = require('../middleware/auth');


const { create, login, me } = require('../controllers/user-controllers');

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

router.post(
  "/signup",
  [
    check("name", "Please Enter a Valid name").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6
    })
  ],
  create
);

/**
 * @method - POST
 * @param - /login
 * @description - User Login
 */

router.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6
    })
  ],
  login
);

/**
 * @method - GET
 * @param - /me
 * @description - User Info
 */

router.get("/me", auth, me);

module.exports = router;