const { Client, IntentsBitField } = require('discord.js');
const { handleMessage } = require('./messageParser');
const { commands } = require('./register-commands');
const fs = require('fs');
const path = require('path');
const { login, register, order_list } = require('./userInteraction');
//const { register } = require('module');

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
   

    //TODO: write code that operates as follows
    // if the command is /login,  call the function login
    // with the interaction.user object as parameter  
    //if the returned user is a guest, reply with an error message
    // else, reply with a success message
    // the returned user should be visible in the rest of the code here
    let user=null;

    if (commandName === 'login') {
      // Call the login function with interaction.user and the alt parameter
      const id = interaction.options.getString('alt'); 
      user = await login(interaction.user,id);
 
      //TODO: authetication check.


      // Check if the returned user is a guest
      if (user && user.id === 'GUEST') {
        await interaction.reply({ content: `${interaction.user}: accesso come ospite.`, ephemeral: true });
      } else {
        await interaction.reply({ content: `${interaction.user}: accesso come ${user.id}`, ephemeral: true });
      }
      return; // Prevent further command handling
    }

    if (commandName === 'register') {
      const alt = interaction.options.getString('alt'); 
      const message = await register(alt);
      await interaction.reply({ content: message, ephemeral: true });
      return; // Prevent further command handling
    }

    if (commandName === 'ping') {await interaction.reply(`${user}, pong!`); return;} 
    
    if (commandName === 'list') {
      // richiama la funzione order_list(opt) che restituisce un array di ordini
      const opt = interaction.options.getString('opt') || ''; // ottiene l'opzione 'opt' o una stringa vuota se non presente
      let reply = order_list(opt);
      await interaction.reply(reply);
      
    } 
    
    if (commandName === 'clr') {
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
    
    } else if (commandName === 'help') {
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