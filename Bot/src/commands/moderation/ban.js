const { ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder } = require('discord.js')
const { embedColor } = require('../../../config.json')

module.exports = {
    name: 'ban',
    description: 'Ban someone.',
    // devsOnly: Boolean,
    // testOnly: Boolean,
    options: [
        {
            name: 'target-user',
            description: 'The user to ban.',
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
        },
        {
            name: 'reason',
            description: 'The reason for the ban.',
            type: ApplicationCommandOptionType.String,
        }
    ],
    permissonsRequired: [
        PermissionFlagsBits.BanMembers
    ],
    botPermissions: [
        PermissionFlagsBits.BanMembers
    ],

    callback: (client, interaction) => {
        const memberToBan = interaction.options.get('target-user')
        const reasonForBan = interaction.options.get('reason')?.value

        const Embed = new EmbedBuilder()
            .setTitle(`Member Banned.`)
            .setColor(embedColor)
            .addFields(
                {
                    name: `User:`,
                    value: `${memberToBan.user}`,
                    inline: true,
                },
                {
                    name: `Reason:`,
                    value: `${reasonForBan}`,
                    inline: true,
                }
                )

        interaction.reply({ embeds: [Embed] })
    }
}