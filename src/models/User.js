const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/postresql');
const News = require('./News');
// define the User model
const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salt: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true, // enable timestamps
});


module.exports = User;
