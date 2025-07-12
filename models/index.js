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


const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.STRING(255),
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  accepted_by_user_id: {
    type: DataTypes.STRING(255),
    allowNull: true,
    references: {
      model: User,
      key: 'id'
    }
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  accepted_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  type: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '1:buy or 2:sell'
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: '0:new - 1:committed - 2:completed - 3:canceled'
  },
  item_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  price_policy: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  location_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
}, {
  tableName: 'orders',
  timestamps: false,
});

module.exports = { sequelize, User, Order };