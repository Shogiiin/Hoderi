const getLocalCommands = require("../../utils/getLocalCommands")
const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: 'help',
    description: 'Sends a list of all features.',
    // devsOnly: Boolean,
    // testOnly: Boolean,
    // options: Object[],

    callback: (client, interaction) => {
        const localCommands = getLocalCommands()

        commandList = ""
        const Embed = new EmbedBuilder()
            .setTitle(`Commands:`)
            .setColor(0xFAFA0F)

        for(const localCommand of localCommands) {
            let { name, description } = localCommand

            name = name.charAt(0).toUpperCase() + name.slice(1)

            Embed.addFields(
                    {
                        name: `${name}:`,
                        value: `${description}`,
                        inline: false,
                    },
                )
        }

        interaction.reply({ embeds: [Embed] })
    }
}