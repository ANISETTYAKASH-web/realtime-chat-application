const { body } = require("express-validator");

const registerUsersValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("username cannot be empty")
    .isLength({ min: 3 }),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email cannot be empty")
    .isEmail()
    .withMessage("provide correct format")
    .normalizeEmail(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("password cannot be empty")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[/d])(?=.*[!@#$%&*])([a-zA-Z/d!@#$%&*]){6,}$/
    )
    .withMessage(
      "password should contain atleast one uppercase ,lowercase, number, special character,min len:6"
    ),
  body("first_name")
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage("should not be empty if provided"),

  body("last_name")
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage("should not be empty if provided"),
];

const loginUserValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email cannot be empty")
    .isEmail()
    .withMessage("provide correct format")
    .normalizeEmail(),
  body
    .apply("password")
    .trim()
    .notEmpty()
    .withMessage("password cannot be empty"),
];

module.exports = {
  registerUsersValidation,
  loginUserValidation,
};
