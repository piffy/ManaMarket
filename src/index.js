require('dotenv').config();
const {sequelize} = require('../models/index');
//require('../models/users');
//require('../models/items');
//require('../models/orders');
const { startBot } = require('./bot');

(async () => {
  try {
    // Synchronize all models with the database
    await sequelize.sync();
    console.log('Database synchronized.');
    startBot();
  } catch (err) {
    console.error('Database sync failed:', err);
    process.exit(1);
  }
})();