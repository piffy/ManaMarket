require('dotenv').config();

const {Client, IntentsBitField} = require('discord.js');

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
}      
)

client.on('messageCreate', message => {
    // Ignore messages from bot  
    if (message.author.bot) return;   
    if (message.content === 'Ping') {
    message.channel.send('Pong!');
  }
});

client.login(process.env.DISCORD_TOKEN)
  .then(() => {
    console.log('Bot is online!');
  })
  .catch(console.error);