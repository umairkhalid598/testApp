const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require("../config/databaseConfig")[env];

const db = {};
config.define = {
  timestamps: true,
  underscored: true,
};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf(".") !== 0) && (file !== "index.js")
    && (file !== basename) && (file.slice(-3) === ".js"))
  .forEach((file) => {
    const model = sequelize.import(path.resolve(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize
  .authenticate()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error("Unable to connect to the database:", err);
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
