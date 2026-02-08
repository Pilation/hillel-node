import { MongoClient } from "mongodb";

let _client = null;

export async function connectToMongo(mongoUri) {
  if (_client) {
    console.log("Already connected to MongoDB");
    return _client;
  }

  const client = new MongoClient(mongoUri);
  try {
    await client.connect();
    _client = client;
    console.log("Connected to MongoDB");
    return client;
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
}

export function getClient() {
  if (!_client)
    throw new Error("MongoClient not initialized. Call connectToMongo() first");
  return _client;
}

export function getDb(dbName) {
  const client = getClient();
  return client.db(dbName);
}

export async function closeClient() {
  if (_client) {
    await _client.close();
    console.log("MongoDB client closed");
    _client = null;
  }
}

export default { connectToMongo, getClient, getDb, closeClient };
