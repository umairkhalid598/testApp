const { validationResult } = require("express-validator/check");
const roomService = require("../../service/room");
const errorHandler = require("../../helper/errorHandler");

module.exports = {
  get: async (req, res) => {
    try {
      const rooms = await roomService.get();
      res.json({ status: res.statusCode, data: rooms.map(role => role.asJsonMap()) });
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
      const room = await roomService.create(req.body);

      res.json({ status: res.statusCode, data: room.asJsonMap() });
    } catch (e) {
      errorHandler(e, req, res);
    }
  },
  invite: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).json({ status: 422, errors: errors.array() });
        return;
      }
      await roomService.invite(req.params.id, req.body);

      res.json({ status: res.statusCode, message: "User invited successfully" });
    } catch (e) {
      errorHandler(e, req, res);
    }
  },
};
