const { Client, IntentsBitField } = require('discord.js');
const { handleMessage } = require('./messageParser');
const { commands } = require('./register-commands');
const fs = require('fs');
const path = require('path');
const { checkAndAddUser } = require('./userInteraction');

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

    //TODO: write a functions that checks check if discord user exists in the database
    //if not, add it to the database and reply with a welcome msg
    // this should be in a separate file, e.g. userInteraction.js
    
    // Check if the Discord user exists in the database, if not add and welcome
    try {
      const isNewUser = await checkAndAddUser(interaction.user);
      if (isNewUser) {
      await interaction.reply(`Benvenuto, ${interaction.user.username}! Il tuo account è stato registrato.`);
      return;
      }
    } catch (err) {
      console.error('Errore durante la verifica/aggiunta dell\'utente:', err);
      await interaction.reply('Si è verificato un errore durante la registrazione dell\'utente.');
      return;
    }


    
    if (commandName === 'ping') {
      await interaction.reply('pong!');

    } else if (commandName === 'list') {
      // Elenca gli ordini pendenti leggendo da orders.txt
      const ordersPath = path.join(__dirname, '..', 'orders.txt');
      let reply = "Lista delle richieste attuali:\n";
      try {
        if (fs.existsSync(ordersPath)) {
          const ordersContent = fs.readFileSync(ordersPath, 'utf-8').trim();
          reply += ordersContent.length > 0 ? ordersContent : "*** nulla ***";
        } else {
          reply += "*** nulla ***";
        }
      } catch (err) {
        reply += "*** errore nella lettura degli ordini ***";
      }
      await interaction.reply(reply);
      
    } else if (commandName === 'clr') {
      // Cancella tutti gli ordini eliminando il file orders.txt
      // ATTENZIONE, QUESTO COMANDO NON PUO' ESSERE ANNULLATO
      const ordersPath = path.join(__dirname, '..', 'orders.txt');
      try {
        if (fs.existsSync(ordersPath)) {
          fs.unlinkSync(ordersPath);
          await interaction.reply('Tutti gli ordini sono stati cancellati. ATTENZIONE, QUESTO COMANDO NON PUO\' ESSERE ANNULLATO.');
        } else {
          await interaction.reply('Nessun ordine da cancellare.');
        }
      } catch (err) {
        await interaction.reply('Errore durante la cancellazione degli ordini.');
      }
    
    } else if (commandName === 'help' || commandName === 'aiuto') {
      // Costruisce il messaggio di aiuto dinamicamente dai comandi
      let helpMessage = "**Comandi attivi:**\n";
      commands.forEach(cmd => {
        helpMessage += `\`/${cmd.name}\` - ${cmd.description}`;
        if (cmd.options && cmd.options.length > 0) {
          const params = cmd.options.map(opt => 
            `${opt.name}${opt.required ? '' : ' (opzionale)'}`
          ).join(', ');
          helpMessage += `\n  Parametri: ${params}`;
        }
        helpMessage += '\n';
      });
      await interaction.reply(helpMessage);
    
    } else if (commandName === 'wtb') {
      const item = interaction.options.getString('item'); 
      const quantity = interaction.options.getInteger('quantity') || 1;   
      const location = interaction.options.getString('location') || '';   
      const displayName = interaction.member ? interaction.member.displayName : interaction.author.username;
      const reply = `${displayName} WTB ${item}${quantity > 1 ? ` x${quantity}` : ''}${location ? ` @${location}` : ''}`; 
      //TODO: check if item is valid, else reply with error message
      //TODO: save the order to orders.txt
      const ordersPath = path.join(__dirname, '..', 'orders.txt');
      const orderLine = `${reply}\n`;
      try {
        fs.appendFileSync(ordersPath, orderLine, 'utf-8');
      } catch (err) {
        console.error('Errore durante il salvataggio dell\'ordine:', err);
      }
      await interaction.reply(reply);  

    } else if (commandName === 'wts') {
      const item = interaction.options.getString('item'); 
      const quantity = interaction.options.getInteger('quantity') || 1;   
      const location = interaction.options.getString('location') || '';   
      const displayName = interaction.member ? interaction.member.displayName : interaction.author.username;
      const reply = `${displayName} WTS ${item}${quantity > 1 ? ` x${quantity}` : ''}${location ? ` @${location}` : ''}`; 
      //TODO: check if item is valid, else reply with error message
      //TODO: save the order to orders.txt
      const ordersPath = path.join(__dirname, '..', 'orders.txt');
      const orderLine = `${reply}\n`;
      try {
        fs.appendFileSync(ordersPath, orderLine, 'utf-8');
      } catch (err) {
        console.error('Errore durante il salvataggio dell\'ordine:', err);
      }
      await interaction.reply(reply);  
    }
     else {
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