const { DataTypes } = require('sequelize');
const sequelize  = require('./index'); 

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  account_id: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  discord_id: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  refresh_token: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  access_token: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  main: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  alt: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  alt2: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'users',
  timestamps: false, // We'll manage timestamps manually
});

module.exports = User;