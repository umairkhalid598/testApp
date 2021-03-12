module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define("Room", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: "room",
  });

  Room.prototype.asJsonMap = function () {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      participants: this.participants,
    };
  };

  Room.associate = (models) => {
    // associations can be defined here
    Room.belongsToMany(models.User, {
      as: "participants",
      through: "UserToRoom",
      foreignKey: "roomId",
    });
  };
  return Room;
};
