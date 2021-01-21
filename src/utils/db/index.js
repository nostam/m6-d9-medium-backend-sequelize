// const { Pool } = require("pg");
// const pool = new Pool();
// module.exports = {
//   async query(text, params) {
//     const start = Date.now();
//     const res = await pool.query(text, params);
//     const duration = Date.now() - start;
//     console.log("executed query", { text, duration, rows: res.rowCount });
//     return res;
//   },
//   pool,
// };

const { Sequelize, DataTypes } = require("sequelize");
const Author = require("./author");
const Category = require("./category");
const Article = require("./article");
const Clap = require("./clap");

const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: process.env.PGHOST,
    dialect: "postgres",
  }
);

const models = {
  Author: Author(sequelize, DataTypes),
  Category: Category(sequelize, DataTypes),
  Article: Article(sequelize, DataTypes),
  Clap: Clap(sequelize, DataTypes),
};

Object.keys(models).forEach((modelName) => {
  if ("associate" in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

sequelize
  .authenticate()
  .then(() => console.log("Connection established"))
  .catch((e) => console.log("Connection failed ", e));

module.exports = models;
