const { validationResult } = require("express-validator/check");
const userService = require("../../service/user");
const errorHandler = require("../../helper/errorHandler");

module.exports = {
  get: async (req, res) => {
    try {
      const users = await userService.getAll();
      res.json({ status: res.statusCode, data: users.map(admin => admin.asJsonMap()) });
    } catch (e) {
      errorHandler(e, req, res);
    }
  },
  create: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).json({ status: 422, errors: errors.array() });
        return;
      }
      const user = await userService.create(req.body);
      res.json({ status: res.statusCode, data: user.asJsonMap() });
    } catch (e) {
      errorHandler(e, req, res);
    }
  },
  getById: async (req, res) => {
    try {
      const user = await userService.getById(req.params.id);
      res.json({ status: res.statusCode, data: user && user.asJsonMap() });
    } catch (e) {
      errorHandler(e, req, res);
    }
  },
  delete: async (req, res) => {
    try {
      await userService.delete(Number(req.params.id));
      res.json({ status: res.statusCode, msg: "User deleted successfully" });
    } catch (e) {
      errorHandler(e, req, res);
    }
  },
};
