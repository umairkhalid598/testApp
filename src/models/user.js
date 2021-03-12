
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    firstName: {
      type: DataTypes.STRING,
      field: "first_name",
    },
    lastName: {
      type: DataTypes.STRING,
      field: "last_name",
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Email address cannot be empty" },
        isEmail: { msg: "Must be valid email address" },
      },
    },
  }, {
    getterMethods: {
      fullName() {
        return `${this.firstName} ${this.lastName}`;
      },
    },
    tableName: "user",
    paranoid: true,
  });

  User.prototype.asJsonMap = function () {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      rooms: this.rooms,
    };
  };

  User.associate = (models) => {
    // associations can be defined here
    User.belongsToMany(models.Room, {
      as: "rooms",
      through: "UserToRoom",
      foreignKey: "userId",
    });
  };
  return User;
};
