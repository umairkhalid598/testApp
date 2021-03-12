module.exports = (sequelize, DataTypes) => sequelize.define("UserToRoom", {
  userId: {
    type: DataTypes.INTEGER,
    field: "user_id",
  },
  roomId: {
    type: DataTypes.INTEGER,
    field: "room_id",
  },
}, {
  tableName: "users_to_rooms",
  timestamps: false,
});
