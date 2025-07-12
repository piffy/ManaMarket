require('dotenv').config();
const {sequelize} = require('../models/index');
//require('../models/users');
//require('../models/items');
//require('../models/orders');
const { startBot } = require('./bot');

(async () => {
  try {
    // Synchronize all models with the database
    //await sequelize.sync({ force: true }); // Use { force: true } to drop and recreate tables
    await sequelize.sync(); // Use this if you want to keep existing data and just update the schema
    console.log('Database synchronized.');
    startBot();
  } catch (err) {
    console.error('Database sync failed:', err);
    process.exit(1);
  }
})();