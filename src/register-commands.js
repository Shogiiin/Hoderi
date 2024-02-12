require('dotenv').config()
const { REST, Routes } = require('discord.js')

const commands = [
    {
        name: 'help',
        description: 'Sends a list of all features."',
    },
    {
        name: 'hey',
        description: 'Replies with "Hey!".',
    }
]

function getCommands() { return commands }


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