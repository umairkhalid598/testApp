module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable("users_to_rooms", {
    user_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    room_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "room",
        key: "id",
      },
    },
  }),
  down: queryInterface => queryInterface.dropTable("users_to_rooms"),
};
