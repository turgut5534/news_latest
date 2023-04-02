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
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  }
});

module.exports = NewsReaction;
