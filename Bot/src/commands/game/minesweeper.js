const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { embedColor } = require('../../../config.json');
const { description, callback } = require('../misc/help');

module.exports = {
    name: 'minesweeper',
    description: 'Generate a Minesweeper-board',
    options: [
        {
            name: 'width',
            description: 'The width of the board.',
            type: ApplicationCommandOptionType.Integer,
        },
        {
            name: 'height',
            description: 'The height of the board.',
            type: ApplicationCommandOptionType.Integer,
        },
        {
            name: 'difficulty',
            description: 'A number between 0 & 100 that defines the difficulty of the board.',
            type: ApplicationCommandOptionType.Integer,
        },
    ],
    callback: (client, interaction) => {
        
    },
}