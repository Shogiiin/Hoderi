require('dotenv').config()
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js')

const commands = [
    {
        name: 'help',
        description: 'Sends a list of all features.',
    },
    {
        name: 'hey',
        description: 'Replies with "Hey!".',
    },
    {
        name: 'clear',
        description: 'Clears the inputed number of messages.',
        options: [
            {
                name: 'msg-number',
                description: 'Number of Messages that should be cleared.',
                type: ApplicationCommandOptionType.Number,
                required: true,
            }
        ]
    },
    {
        name: 'add',
        description: 'Adds two numbers.',
        options: [
            {
                name: 'first-number',
                description: 'The first number',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
            {
                name: 'second-number',
                description: 'The second number',
                type: ApplicationCommandOptionType.Number,
                required: true,
            }
        ]
    },
]

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Registering / commands.')
        
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands },
        )

        console.log('/ commands are now registered.')
    } catch (error) {
        console.log(`An error accured ${error}`)
    }
})();

module.exports = commands