const { DataTypes } = require('sequelize');
const sequelize = require('../db/postresql');
const User = require('./User');
const News = require('./News');

const NewsReaction = sequelize.define('news_reaction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  news_id: {
    type: DataTypes.INTEGER,
    references: {
      model: News,
      key: 'id'
    }
  },
  action_type: {
    type: DataTypes.INTEGER
  },
  created_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  },
  updated_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  }
}, {
  tableName: 'news_reaction',
  timestamps: false
});

module.exports = NewsReaction;
