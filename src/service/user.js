const { User, Room, UserToRoom } = require("../models");

module.exports = {
  getAll: async () => User.findAll(),
  create: async (userObj) => {
    const {
      firstName, lastName, email, password,
    } = userObj;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      await User.create({
        firstName,
        lastName,
        email,
        password,
      });
    }
    return User.findOne({ where: { email } });
  },
  getById: async id => User.findOne({
    where: {
      id,
    },
    include: [{
      model: Room,
      as: "rooms",
    }],
  }),
  delete: async (id) => {
    const user = await User.findOne({
      where: {
        id,
      },
      include: "rooms",
    });
    if (user.rooms.length > 1) {
      await UserToRoom.destroy({
        where: {
          userId: id,
        },
      });
    }
    await User.destroy({
      where: {
        id,
      },
    });
  },
};
