const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

// Crea una nuova istanza Sequelize che usa SQLite come database locale
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'orders.sqlite'),
  logging: false, // Imposta a true per vedere le query in console
});

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


module.exports = { sequelize, User };