const { body } = require("express-validator/check");

module.exports = (method) => {
  switch (method) {
  case "create":
    return [
      body("firstName", "Please provide first name")
        .exists().trim().isLength(1),
      body("lastName", "Please provide last name").trim().optional(),
      body("email", "provide valid email").trim()
        .exists().isEmail(),
    ];
  default:
    return null;
  }
};
