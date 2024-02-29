const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')

module.exports = {
    name: 'clear',
    description: 'Clears the inputed number of messages.',
    // devsOnly: Boolean,
    // testOnly: Boolean,
    options: [
        {
            name: 'msg-number',
            description: 'Number of Messages that should be cleared.',
            type: ApplicationCommandOptionType.Number,
            required: true,
        }
    ],

    callback: (client, interaction) => {
        const numOfMessages = interaction.options.get('msg-number').value

            const Embed = new EmbedBuilder()
                .setTitle(`Messages Cleared!`)
                .setDescription(`I have cleared the last ${numOfMessages} messages in this channel.`)
                .setColor(0xFAFA0F)


            interaction.reply({ embeds: [Embed] })
    }
}