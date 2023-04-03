const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/postresql');
const User = require('./User');

const UserPassword = sequelize.define('user_password', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    },
    allowNull: false
  },
  salt_pass: {
    type: DataTypes.BLOB,
    allowNull: false
  },
  hash_pass: {
    type: DataTypes.BLOB,
    allowNull: false
  },
  created_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updated_date: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'user_password',
  timestamps: false
});

module.exports = UserPassword;
