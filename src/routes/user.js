const userController = require("../controllers").user;
const validate = require("../controllers/user/validation");

module.exports = (app) => {
  app.get("/api/users", userController.get);
  app.post("/api/users", validate("create"), userController.create);
  app.get("/api/users/:id", userController.getById);
  app.delete("/api/users/:id", userController.delete);
};
