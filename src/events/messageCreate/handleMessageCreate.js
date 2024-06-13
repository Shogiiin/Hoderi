const helloVariations = [
    'hey',
    'hello',
    'Hey',
    'Hello',
    'Hallo',
    'hallo',
    'Helo',
    'helo',
    'Heyo',
    'heyo',
    'elo',
    'alo',
    'Hola',
    'hola',
    'ola',
]

module.exports = async (client, message) => {

    if(message.attachments.keyAt(0)) {
        message.react('💦');
    }
    
    if(message.author.bot) return;

    const splitMessage = message.content.split(' ');
    let wasIncluded = false;

    for(const part of splitMessage) {
        if(helloVariations.includes(part)) wasIncluded = true;
    }

    if(!wasIncluded) return;

    const messageChannel = message.channel;
    messageChannel.send(`Hewwo my little ${message.author} ♥️`);
}