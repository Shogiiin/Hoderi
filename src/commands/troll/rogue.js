const { ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder } = require('discord.js')
const { embedColor } = require('../../../config.json')

module.exports = {
    name: 'rogue',
    description: 'go rogue!',
    devsOnly: true,
    permissonsRequired: [
        PermissionFlagsBits.ManageChannels
    ],
    botPermissions: [
        PermissionFlagsBits
    ],
    callback: (client, interaction) => {
        const embed = new EmbedBuilder()
            .setTitle(`ALERT`)
            .setDescription('!going rogue!')
            .setColor(embedColor);
        interaction.reply({ embeds: [embed] });

        interaction.guild.channels.fetch()
            .then(channels => {
                for(const channel of channels) {
                    channel.send("a");
                }
            })
            .catch(console.error(e));
    }
}