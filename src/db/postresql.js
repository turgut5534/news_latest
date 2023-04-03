require('dotenv').config();
const { Sequelize } = require('sequelize')

const dbName = "turgut";
const dbUser = "postgres";
const dbPass = "Busra!keles!1";
const dbHost = "localhost";

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
    host: dbHost,
    dialect: 'postgres'
  });

  module.exports = sequelize