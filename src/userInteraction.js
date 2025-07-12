const { User } = require('../models/index');
const { Order } = require('../models/index');

/**
 * login(discordUser)
 * Purpose: Checks if a Discord user exists in the database by discord_id.
 * If so, returns the full User resource
 * if not, returns a "fake user" with id GUEST and discord_id set to the user's id without 
 * modifying the database. 
  * This is useful for allowing users to interact with the bot without needing to register first.
* @param {String} discordUser - The Discord user object, typically from an interaction.
* @param {String} alt - The nave of the alt in EVE Online.
* @returns {Object} - Returns a user object with the following properties:
*   - id: The user's ID or 'GUEST' if not registered.
*   - discord_id: The Discord ID of the user or null if not registered.
*   - account: The EVE Online account name or null if not registered. 
 */

async function login(discordUser,alt) {
  if (!discordUser || !discordUser.id) {
    // Edge case: discordUser is null or missing id
    return {
      id: 'GUEST',
      discord_id: null,
      account: null,
    };
  }

  // Try to find the user in the database
  const user = await User.findOne({ where: { id: alt } });

  if (user) {
    // User exists, return full user resource
    return user;
  } else {
    // User does not exist, return a "fake user" object
    return {
      id: 'GUEST',
      discord_id: discordUser.id,
      account: null,
    };
  }
}

/**
 * register(alt)
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


/**
 * order_list(opt) 
 * Purpose: Obtain a list of orders based on the provided filter option.
 * If no option is provided, it returns all orders.
 * The opt parameter can be:
 * - 'm' for my orders (orders made by the user)
 * - 'b' for buy orders (type === 1 )
 * - 's' for sell orders (type === 2)
 * - 'id' for a specific order ID, must be a number, must be the only parameter.
 *
 * 
 * returns a text msg for each order follwing this format
 * (order id) (type, converted to B  or S) (object name)x(quantity) (price) (date created)
 * one line each order, with an header line like this:
 * "Lista delle richieste attuali:\n"
 * 
 * @param {String} opt - The filter option for the orders.  
 * @returns {String} - A string containing the list of orders
 * 
 */

async function order_list(opt) {
  // Header for the order list
  let result = "Lista delle richieste attuali:\n";

  let whereClause = {};

  // Determine filter based on opt
  if (!opt) {
    // No filter, get all orders
    whereClause = {};
  } else if (opt === 'b') {
    // Buy orders (type === 1)
    whereClause = { type: 1 };
  } else if (opt === 's') {
    // Sell orders (type === 2)
    whereClause = { type: 2 };
  } else if (opt === 'm') {
    // My orders - requires user context, but not provided here
    // For demonstration, assume 'my orders' means orders with a specific property
    // You may need to adjust this logic based on your actual user context
    whereClause = { myOrder: true };
  } else if (!isNaN(opt)) {
    // Specific order ID
    whereClause = { id: Number(opt) };
  } else {
    // Invalid option
    return "Opzione non valida.";
  }

  // Fetch orders from database
  const orders = await Order.findAll({ where: whereClause });

  if (!orders || orders.length === 0) {
    return result + "Nessun ordine trovato.";
  }

  // Format each order line
  orders.forEach(order => {
    const typeStr = order.type === 1 ? 'B' : (order.type === 2 ? 'S' : '?');
    const dateStr = order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '';
    result += `${order.id} ${typeStr} ${order.object_name}x${order.quantity} ${order.price} ${dateStr}\n`;
  });

  return "Ordini attuali:"+ result;
  //return result;
}



module.exports = { login, register, order_list };

