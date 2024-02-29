const { ActivityType } = require('discord.js')

module.exports = (client) => {
    console.log(`\n${client.user.username} went online!`)
    const Guilds = client.guilds.cache.map(guild => guild.id);
    client.user.setActivity({
        name: 'Just Chilling',
        type: ActivityType.Custom,
    })
}