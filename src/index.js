require('dotenv').config()

require('./register-commands')
const rc = require('./register-commands')
console.log(commands)
const commandList = ""
for(command in commands) {
    
    commandList += "\n" + command.name + " | " + command.description
}

const { Client, IntentsBitField, MessageCollector } = require('discord.js')

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
})

client.once('ready', (c) => {
    console.log(`\n${c.user.username} went online!`)
    const Guilds = client.guilds.cache.map(guild => guild.id);
    console.log(Guilds);
})

client.on('interactionCreate', (interaction) => {
    if(!interaction.isChatInputCommand()) return

    switch(interaction.commandName) {
        case 'hey':
            interaction.reply('Hey!')
        break;
        case 'help':
            interaction.reply(`Commands: ${commandList}`)
        break;
    }
})

client.login(process.env.TOKEN)