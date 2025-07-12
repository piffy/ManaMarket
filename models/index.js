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
    type: DataTypes.STRING(255),
    primaryKey: true, // ID = nome del personaggio principale
    allowNull: false,
    comment: 'EVE char name'
  },
  discord_id: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  refresh_token: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: 'ESI refresh token'
  },
  access_token: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: 'ESI access token'
  },
  account: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: 'Got by ESI, immutable'
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  }
}, {
  tableName: 'users',
  timestamps: false, // timestamps gestiti manualmente
});

module.exports = { sequelize, User };