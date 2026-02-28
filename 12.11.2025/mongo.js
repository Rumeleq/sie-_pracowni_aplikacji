const { MongoClient } = require("mongodb");

let client = null;
let db = null;

async function connectMongo(uri, dbName) {
  if (client && db) {
    return db;
  }
  if (!uri || !dbName) {
    return null;
  }
  client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);
  return db;
}

function getDb() {
  return db;
}

async function closeMongo() {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
}

module.exports = { connectMongo, getDb, closeMongo };
