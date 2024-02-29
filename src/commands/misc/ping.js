module.exports = {
    name: 'ping',
    description: 'Pong!',
    // devsOnly: Boolean,
    // testOnly: Boolean,
    // options: Object[],
    // deleted: Boolean,

    callback: (client, interaction) => {
        interaction.reply(`Pong!`)
    }
}