const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/postresql');
const UserPassword = require('../models/UserPassword')

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  facebook_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  google_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  instagram_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  apple_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  verified_member: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  created_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updated_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  RefreshToken: {
    type: DataTypes.STRING,
    allowNull: true
  },
  RefreshTokenEndDate: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'user'
});

User.hasMany(UserPassword, { foreignKey: 'user_id' });


// sequelize.sync()

module.exports = User;
