const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./users');
// Assicurati di creare anche il modello items.js per la FK su item_id
const Item = require('./items'); // <-- crea questo file se non esiste

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  accepted_by_user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  item_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Item,
      key: 'id',
    },
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  accepted_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  type: {
    type: DataTypes.INTEGER, // 1:buy, 2:sell
    allowNull: false,
  },
  status: {
    type: DataTypes.INTEGER, // 0:new - 1:committed - 2:completed - 3:canceled
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
  amount: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  location: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
  tableName: 'orders',
  timestamps: false, // gestiamo i timestamp manualmente
});


module.exports = Order;
