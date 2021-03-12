const { Room, User } = require("../models");

module.exports = {
  get: async () => Room.findAll({
    include: [{
      model: User,
      as: "participants",
    }],
  }),
  create: async (params) => {
    const {
      name,
      description,
    } = params;
    return Room.create({
      name,
      description,
    });
  },
  invite: async (roomId, { email }) => {
    console.log(roomId, email)
    const room = await Room.findOne({
      where: {
        id: roomId,
      },
    });
    if (!room) {
      const error = new Error("Room not found");
      error.code = 404;
      throw error;
    }
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      const error = new Error("User not found");
      error.code = 404;
      throw error;
    }
    return room.addUser(user);
  },
};
