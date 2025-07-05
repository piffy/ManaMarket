require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType  } = require('discord.js');

const  commands = [
  {     

    name: 'ping',
    description: 'Risponde con pong!'
    },
    {
    name: 'help',
    description: 'Risponde con un messaggio infomativo su come usare il bot.'
    },
    {
    name: 'aiuto',
    description: 'Risponde con un messaggio infomativo su come usare il bot.'
    },
    {
    name: 'list',
    description: 'Elenca tutti gli ordini pendenti.'
    },
    {
    name: 'clr',
    description: 'cancella tutti gli ordini. ATTENZIONE, QUESTO COMANDO NON PUO\' ESSERE ANNULLATO.',
    },
    {
    name: 'users',
    description: 'comando di prova, elenca gli utenti del sistema',

    },
    {
    name: 'wtb',
    description: 'Want To Buy - richiesta di acquisto.',
    options: [
      {
        name: 'item',
        description: 'L\'oggetto che si desidera acquistare.',
        type: 3, // STRING
        required: true,
      },
      {
        name: 'quantity',
        description: 'La quantità desiderata (opzionale).',
        type: 4, // INTEGER
        required: false,
      },
     {
      name: 'location',
        description: 'dove consegnare l\'oggetto (opzionale).',
        type: 3, // STRING
        choices: [
          { name: 'Azbel', value: 'Azbellina' },
          { name: 'Tatara', value: 'Tatara' },
          { name: 'Fortizar', value: 'Fortizar' },
        ],  
        required: false,
      },

    ],
    },
{
    name: 'wts',
    description: 'Want To Sell - richiesta di vendita.',
    options: [
      {
        name: 'item',
        description: 'L\'oggetto che si desidera vendere.',
        type: 3, // STRING
        required: true,
      },
      {
        name: 'quantity',
        description: 'La quantità desiderata (opzionale).',
        type: 4, // INTEGER
        required: false,
      },
     {
      name: 'location',
        description: 'dove consegnare l\'oggetto (opzionale).',
        type: 3, // STRING
        choices: [
          { name: 'Azbel', value: 'Azbellina' },
          { name: 'Tatara', value: 'Tatara' },
          { name: 'Fortizar', value: 'Fortizar' },
        ],  
        required: false,
      },

    ],
    },
]

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);   


(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error('Error registering commands:', error);
  }
})();

module.exports = { commands };