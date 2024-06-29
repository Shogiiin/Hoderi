require('dotenv').config()
const { Client, IntentsBitField, MessageCollector, EmbedBuilder, ActivityType } = require('discord.js')
const eventhandler = require('./handlers/eventhandler')

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
})


eventhandler(client);

client.login(process.env.TOKEN);



// DataBase
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = "mongodb://localhost:27017";
const dbName = 'Hoderi'
const dbClient = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
);
async function run() {
  try {
    
    const subbedGuilds = await client.guilds.fetch();

    const db = dbClient.db(dbName);
    const collection = db.collection('Guilds');
    const listOfSubbedIDs = [];

    for(const guild of subbedGuilds) {
        listOfSubbedIDs.push(guild.id);
        const entry = {
            name: guild.name,
            id: guild.id,
            memberCount: guild.memberCount,
        }

        if(await collection.findOne({ id: guild.id })) continue;

        await collection.insertOne(entry);
    }


    const result = await collection.find().toArray();
    const idsToDelete = [];
    for(const guildInDb of result) {
        if(listOfSubbedIDs.includes(guildInDb.id)) continue;
        idsToDelete.push(guildInDb.id);
    }
    collection.deleteMany({id: {idsToDelete}});

  } finally {
    await dbClient.close();
  }
}
run().catch(console.dir);