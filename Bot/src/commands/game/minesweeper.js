const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { embedColor } = require('../../../config.json');

module.exports = {
    name: 'minesweeper',
    description: 'Generate a Minesweeper-board',
    options: [
        {
            name: 'size',
            description: 'The size of the board. (Largest is 10)',
            type: ApplicationCommandOptionType.Integer,
        },
        {
            name: 'difficulty',
            description: 'A number between 1 & 95 that defines the difficulty of the board.',
            type: ApplicationCommandOptionType.Integer,
        },
    ],
    callback: (client, interaction) => {
        // Defining board dimensions
        const sizeOfBoard = interaction.options.get('size')?.value ?? 10;
        const widthOfBoard = sizeOfBoard;
        const heightOfBoard = sizeOfBoard+1;

        // Checking leghth of params
        if(sizeOfBoard > 10) {
            const embed = new EmbedBuilder()
                .setTitle("Sorry you made the board to big.   🫤")
                .setDescription('The maximum size a Board can have is 10.')
                .setColor(embedColor);
            interaction.reply({ embeds: [embed], ephemeral: true });
            return;
        };

        // Defining Difficulty
        // difficultyValue is the percentage of boardspaces of bombs
        let difficultyValue = interaction.options.get('difficulty')?.value ?? 40;
        if(difficultyValue<1 || difficultyValue > 95) difficultyValue = 50;

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

        const icons = {
            bomb: "🧨",
            zero: "0️⃣",
            one: "1️⃣",
            two: "2️⃣",
            three: "3️⃣",
            four: "4️⃣",
            five: "5️⃣",
            six: "6️⃣",
            seven: "7️⃣",
            eight: "8️⃣",
        }

        let formattedBoard = [];
        formattedBoard.push("Minesweeper.exe        —    ▭    𝗑");
        for(let rowNum = 0; rowNum < heightOfBoard-1; rowNum++) {
            let formattedRow = "||";
            for(let columnNum = 0; columnNum < widthOfBoard; columnNum++) {
                if(columnNum != 0) {
                    if(board[rowNum][columnNum] == 0) {
                        if(columnNum-1 < 0) {} else {
                            if(board[rowNum][columnNum-1] != 0) formattedRow += "||";
                        }
                    } else {
                        formattedRow += "||";
                    }
                }

                switch(board[rowNum][columnNum]) {
                    case -1:
                        formattedRow += `${icons.bomb}||`;
                        continue;
                    case 0:
                        formattedRow += `${icons.zero}`;
                        break;
                    case 1:
                        formattedRow += `${icons.one}||`;
                        continue;
                    case 2:
                        formattedRow += `${icons.two}||`;
                        continue;
                    case 3:
                        formattedRow += `${icons.three}||`;
                        continue;
                    case 4:
                        formattedRow += `${icons.four}||`;
                        continue;
                    case 5:
                        formattedRow += `${icons.five}||`;
                        continue;
                    case 6:
                        formattedRow += `${icons.six}||`;
                        continue;
                    case 7:
                        formattedRow += `${icons.seven}||`;
                        continue;
                    case 8:
                        formattedRow += `${icons.eight}||`;
                        continue;
                }

                if(columnNum+1 > widthOfBoard-1) {
                    formattedRow += "||";
                    continue;
                };
                if(board[rowNum][columnNum+1] != 0) formattedRow += "||";
            }
            formattedBoard += `\n${formattedRow}`;
        }
        
        interaction.reply(`${formattedBoard}`);
    },
}