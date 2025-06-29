const { Client, IntentsBitField } = require('discord.js');
const { handleMessage } = require('./messageParser');

function startBot() {
  const client = new Client({
    intents: [
      IntentsBitField.Flags.Guilds,
      IntentsBitField.Flags.GuildMembers,
      IntentsBitField.Flags.GuildMessages,
      IntentsBitField.Flags.MessageContent,
    ],
  });

  client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

  client.on('messageCreate', (message) => {
    // Ignore messages from bots
    if (message.author.bot) return;
    handleMessage(message);
  });

  client.login(process.env.DISCORD_TOKEN)
    .then(() => {
      console.log('Bot is online!');
    })
    .catch(console.error);
}

module.exports = { startBot };