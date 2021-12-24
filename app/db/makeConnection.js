const {MongoClient} = require("mongodb");

module.exports = makeConnection;

async function makeConnection(url, db) {
    const client = new MongoClient(url); 
    await client.connect();
    const _db = client.db(db);
    return _db;
}