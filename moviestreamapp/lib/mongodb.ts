import { MongoClient, Db } from "mongodb";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/MovieStreamPlayground";

  const client = new MongoClient(uri);
  const db = client.db("MovieStreamPlayground");

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
