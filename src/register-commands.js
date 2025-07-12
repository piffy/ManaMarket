require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType  } = require('discord.js');

const  commands = [
  {     

    name: 'ping',
    description: 'Risponde con pong e dà informazioni su di te!'
    },
    {
    name: 'help',
    description: 'Risponde con un messaggio infomativo su come usare il bot.'
    },
 {
    name: 'list',
    description: 'Elenca tutti gli ordini pendenti.',
    options: [
      {
        name: 'opt',
        description: 'filtro:  (m)ine/(b)uy/(s)ell/[id]).',
        type: 3, // STRING
        required: false,
      },
    ],
},
    {
    name: 'login',
    description: 'collega il tuo account discord a uno specifico alt',
    options: [
      {
        name: 'alt',
        type: 3,
        description: 'Il nome dell\'alt da collegare.',
        type: ApplicationCommandOptionType.String, // STRING
        required: true,
      },
    ],
    },
        {
    name: 'register',
    description: 'DEVELOP simula inserimento alt nel sistema',
    options: [
      {
        name: 'alt',
        type: 3,
        description: 'Il nome dell\'alt da collegare.',
        type: ApplicationCommandOptionType.String, // STRING
        required: true,
      },
    ],
    },
    /**
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
    }, **/
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