const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')
const { embedColor } = require('../../../config.json')

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
        let embed = new EmbedBuilder()
        .setTitle(`Messages cleared!`)
        .setDescription(`:c`)
        .setColor(embedColor);

        if(numOfMessages > 100) {
            embed = new EmbedBuilder()
            .setTitle(`Failed to clear.`)
            .setDescription(`I'm sorry but you can delete a maximum of 100 messages per action.`)
            .setColor(embedColor);
        } else {
            interaction.channel.bulkDelete(numOfMessages, true)

            embed = new EmbedBuilder()
                .setTitle(`Messages cleared!`)
                .setDescription(`I have cleared the last ${numOfMessages} messages in this channel.`)
                .setColor(embedColor);
        }

        interaction.reply({ embeds: [embed], ephemeral: true })
    }
}