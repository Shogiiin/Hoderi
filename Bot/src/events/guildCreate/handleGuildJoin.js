// const { MongoClient, ServerApiVersion } = require("mongodb");


module.exports = async (client, guild) => {
    // const uri = "mongodb://localhost:27017";
    // const dbName = 'Hoderi'
    // const dbClient = new MongoClient(uri,  {
    //         serverApi: {
    //             version: ServerApiVersion.v1,
    //             strict: true,
    //             deprecationErrors: true,
    //         }
    //     }
    // );

    // try {
        
    //     const db = dbClient.db(dbName);
    //     const collection = db.collection('Guilds');

    //     const entry = {
    //         name: guild.name,
    //         id: guild.id,
    //         memberCount: guild.memberCount,
    //     }

    //     if(await collection.findOne({ id: guild.id })) return;

    //     await collection.insertOne(entry);

    // } catch(err) {
    //     console.error(err);
    // } finally {
    //     await dbClient.close();
    // }
}