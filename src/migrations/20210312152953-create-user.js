module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable("user", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    first_name: {
      type: Sequelize.STRING,
    },
    last_name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    deleted_at: {
      allowNull: true,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable("user"),
};
