const { User } = require('../models/index');

/**
 * login(discordUser)
 * Purpose: Checks if a Discord user exists in the database by discord_id.
 * If so, returns the full User resource
 * if not, returns a "fake user" with id GUEST and discord_id set to the user's id without 
 * modifying the database. 
  * This is useful for allowing users to interact with the bot without needing to register first.
* @param {String} discordUser - The Discord user object, typically from an interaction.
 */

async function login(discordUser) {
  if (!discordUser || !discordUser.id) {
    // Edge case: discordUser is null or missing id
    return {
      id: 'GUEST',
      discord_id: null,
      account: null,
      isGuest: true,
    };
  }

  // Try to find the user in the database
  const user = await User.findOne({ where: { discord_id: discordUser.id } });

  if (user) {
    // User exists, return full user resource
    return user;
  } else {
    // User does not exist, return a "fake user" object
    return {
      id: 'GUEST',
      discord_id: discordUser.id,
      account: null,
      isGuest: true,
    };
  }
}

/**
 * register(user_interaction)
 * NOTE: This function is development only!!
 * Purpose: Add user to the database if not exists,
 * else flag an error.
returns a messege with the user id and username, or a message indicating the user is already registered.
 */
async function register(alt) {

  //console.log(user_interaction);
  
  // Check if user already exists
  const existingUser = await User.findOne({ where: { id: alt } });

  if (existingUser) {
    // User already registered
    return `DEVELOP: User ${existingUser.id} already registered`;
  }

  // Add new user to the database
  const newUser = await User.create({
    id: alt,
    account:alt,
    discord_id: null,
    refresh_token: "RTOKEN",
    access_token: "ATOKEN",
  });

  return `DEVELOP User ${newUser.id} registered in database`;
}




module.exports = { login, register };

