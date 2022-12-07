require("dotenv").config();
const mysql = require("mysql");
const Sequelize = require("sequelize");
const fs = require("fs");
const rds = fs.readFileSync("/home/ubuntu/global-bundle.pem");

const sequelize = new Sequelize(
  process.env.RDS_DB_NAME,
  process.env.RDS_USERNAME,
  process.env.RDS_PASSWORD,
  {
    host: process.env.RDS_HOST,
    dialect: "mysql",
    port: process.env.RDS_PORT,
    operatorsAliases: "0",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: {
      ssl: {
        rejectUnauthorized: true,
        ca: [rds],
      },
    },
  }
);

module.exports = sequelize;
