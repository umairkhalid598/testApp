const roomController = require("../controllers").room;
const validate = require("../controllers/room/validation");

module.exports = (app) => {
  app.get("/api/rooms", roomController.get);
  app.post("/api/rooms", validate("create"), roomController.create);
  app.post("/api/rooms/:id/user/invite", roomController.invite);
};
