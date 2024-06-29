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
        // Defining board dimensions
        const widthOfBoard = interaction.options.get('width')?.value ?? 5;
        const heightOfBoard = interaction.options.get('height')?.value ?? 5;

        // Defining Difficulty
        // difficultyValue is the percentage of boardspaces of bombs
        let difficultyValue = interaction.options.get('height')?.value ?? 40;
        if(difficultyValue<0 || difficultyValue > 100) difficultyValue = 40;

        // Calculate number of bomspaces from the area of the board
        const bombspaceCount = (difficultyValue * (widthOfBoard * heightOfBoard)) / 100;

        // init board with all spaces equal to zero
        let board = [];
        for(let i = 0; i < heightOfBoard; i++) {
            let row = [];
            
            for(let j = 0; j < widthOfBoard; j++) {
                row.push(0);
            }

            board.push(row);
        }

        // init bombspaces on board
        for(let i = 0; i < bombspaceCount; i++) {
            const randXValue = Math.floor(Math.random()*widthOfBoard);
            const randYValue = Math.floor(Math.random()*heightOfBoard);

            if(board[randYValue][randXValue] === -1) {
                i--;
                continue;
            }

            board[randYValue][randXValue] = -1;
        }

        // init number spaces
        let currentSpace = {x: 0, y: 0};
        const bombLocations = []
        for(let i = 0; i < widthOfBoard*heightOfBoard; i++) {
            // If the current space is not a bomb
            if(board[currentSpace.y][currentSpace.x] != -1) {
                let bombsInArea = 0;
                let currentSpaceToCheck = {x: currentSpace.x-1, y: currentSpace.y-1};
                for(let y = 0; y < 3; y++) {
                    currentSpaceToCheck.y = currentSpace.y - 1 + y;
                    for(let x = 0; x < 3; x++) {
                        currentSpaceToCheck.x = currentSpace.x - 1 + x;
                        
                        if(currentSpaceToCheck.x == currentSpace.x && currentSpaceToCheck.y == currentSpace.y) continue;
                        if(currentSpaceToCheck.x<0 || currentSpaceToCheck.x > widthOfBoard-1) continue;
                        if(currentSpaceToCheck.y<0 || currentSpaceToCheck.y > heightOfBoard-1) continue;
                        
                        if(board[currentSpaceToCheck.y][currentSpaceToCheck.x] == -1) bombsInArea++;
                    }
                }
                board[currentSpace.y][currentSpace.x] = bombsInArea;
                bombsInArea = 0;
            }
            
            if(currentSpace.x+1 > heightOfBoard-1) {
                currentSpace.x = 0;
                currentSpace.y++;
            } else {
                currentSpace.x++;
            }
        }

        
        // interaction.reply(`Width: ${widthOfBoard}, Height: ${heightOfBoard}, Board: ${board}`);
    },
}