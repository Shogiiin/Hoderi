require('dotenv').config()

//require('./register-commands')
let commands = []
commands = require('./register-commands')
let commandList = ""
for(c of commands) {
    commandList += "\n" + c.name + " | " + c.description
}

const { Client, IntentsBitField, MessageCollector, EmbedBuilder, ActivityType } = require('discord.js')

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
    client.user.setActivity({
        name: 'Just Chilling',
        type: ActivityType.Custom,
    })
})

client.on('interactionCreate', (interaction) => {
    if(!interaction.isChatInputCommand()) return

    switch(interaction.commandName) {
        case 'help':
            interaction.reply(`Here's a list of all my commands: ${commandList}`)
        break;

        case 'clear':
            const numOfMessages = interaction.options.get('msg-number').value

            const clearEmbed = new EmbedBuilder()
                .setTitle(`Messages Cleared!`)
                .setDescription(`I have cleared the last ${numOfMessages} messages in this channel.`)
                .setColor(0xFAFA0F)


            interaction.reply({ embeds: [clearEmbed] })
        break;
    }
})

client.login(process.env.TOKEN)