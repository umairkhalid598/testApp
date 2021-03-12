const { body } = require("express-validator/check");

module.exports = (method) => {
  if (method === "create") {
    return [
      body("name", "Please provide name").exists(),
      body("description", "Please provide description for role").exists(),
    ];
  } if (method === "invite") {
    return [
      body("email", "Please provide email for invite").trim()
        .exists().isEmail(),
    ];
  }
  return null;
};
