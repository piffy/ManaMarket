const { User } = require('../models/index');

/**
 * checkAndAddUser_StateUserObject_ShouldAddIfNotExists
 * Purpose: Checks if a Discord user exists in the database by discord_id.
 * If not, adds the user and returns true. If exists, returns false.
 * @param {Object} discordUser - The Discord user object (must have id and username)
 * @returns {Promise<boolean>} - true if user was added, false if already exists
 */
async function checkAndAddUser(discordUser) {
  // Check if user exists by discord_id
  const existing = await User.findOne({ where: { discord_id: discordUser.id } });
  if (existing) {
    return false;
  }
  // Create new user with minimal info (expand as needed)
  await User.create({
    account_id: discordUser.username,
    discord_id: discordUser.id,
    refresh_token: '', // Placeholder, adjust as needed
    access_token: '',  // Placeholder, adjust as needed
    main: discordUser.username,
    alt: null,
    alt2: null,
  });
  return true;
}

module.exports = { checkAndAddUser }

