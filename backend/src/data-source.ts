const { DataSource } = require("typeorm");
require("dotenv").config();

module.exports = new DataSource({
  type: "postgres",
  host: "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "notests",
  synchronize: false,
  logging: true,
  entities: [__dirname + "/entities/**/*.ts"],
  migrations: [__dirname + "/migrations/**/*.ts"],
  subscribers: [],
});
