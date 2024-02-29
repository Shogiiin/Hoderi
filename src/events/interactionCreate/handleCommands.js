const { devs, testServer } = require('../../../config.json')
const getLocalCommands = require('../../utils/getLocalCommands')


module.exports = async (client, interaction) => {

    if(!interaction.isChatInputCommand()) return

    const localCommands = getLocalCommands()

    try {
        const commandObject = localCommands.find((cmd) => cmd.name === interaction.commandName)

        if(!commandObject) return
        if(commandObject.devOnly) {
            if(!devs.includes(interaction.member.id)) {
                interaction.reply({
                    content: 'Only devs can run this command. ¯\_(ツ)_/¯',
                    ephemeral: true, //only person that types command can see this 
                })
                return
            }
        }
        if(commandObject.testOnly) {
            if(!(interaction.guild.id === testServer)) {
                interaction.reply({
                    content: 'Command can only be run on test server. ¯\_(ツ)_/¯',
                    ephemeral: true, //only person that types command can see this 
                })
            }
        }

        if(commandObject.permissionsRequired?.length) {
            for(const permission of commandObject.permissionsRequired) {
                if(!interaction.member.permissions.has(permission)) {
                    interaction.reply({
                        content: `You don't have enough permissions to run this. ¯\_(ツ)_/¯`,
                        ephemeral: true, //only person that types command can see this 
                    })
                    break
                }
            }
        }

        if(commandObject.botPermissions?.length) {
            for(const permission of commandObject.botPermissions) {
                const bot = interaction.guild.members.me

                if(!bot.permissions.has(permission)) {
                    interaction.reply({
                        content: `I don't have enough permissions to run this. ¯\_(ツ)_/¯`,
                        ephemeral: true, //only person that types command can see this 
                    })
                    break
                }
            }
        }

        await commandObject.callback(client, interaction)

    } catch (error) {
        console.log(`There was an error running this command: ${error}`)
    }

}