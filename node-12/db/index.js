// db/index.js
import { MongoClient } from "mongodb";
import "dotenv/config";

const url = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;

if (!url) throw new Error("MONGO_URL is not defined in .env");
if (!dbName) throw new Error("DB_NAME is not defined in .env");

let client;
let db;

export async function connectToMongo() {
  if (db) return db;

  client = new MongoClient(url);
  await client.connect();

  db = client.db(dbName);
  console.log("✅ MongoDB connected:", dbName);

  return db;
}

export function getDb() {
  if (!db) throw new Error("DB not initialized. Call connectToMongo() first.");
  return db;
}

export async function closeMongo() {
  if (client) await client.close();
}
