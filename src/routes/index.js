const room = require("./room");
const user = require("./user");

module.exports = (app) => {
  room(app);
  user(app);
};
