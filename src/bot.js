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

  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'ping') {
      await interaction.reply('pong!');
    } else if (commandName === 'help' || commandName === 'aiuto') {
      await interaction.reply('Questo è un bot di controllo del mercato interno. Usa i comandi `/ping` o `/beep` per interagire con esso.');
    } else {
      await interaction.reply({ content: 'Unknown command', ephemeral: true });
    }
  }); 



  client.login(process.env.DISCORD_TOKEN)
    .then(() => {
      console.log('Bot is online!');
    })
    .catch(console.error);
}

module.exports = { startBot };