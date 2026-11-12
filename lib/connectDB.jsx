import mongoose from "mongoose";

/**
 * One cached connection per server instance (serverless functions reuse it
 * between requests). MONGODB_DB picks the database; the original build used
 * "restAPI".
 */
const cached = globalThis.__gloriousMongo || (globalThis.__gloriousMongo = { conn: null, promise: null });

export default async function connect() {
  if (cached.conn) return cached.conn;
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");
  cached.promise ||= mongoose.connect(uri, {
    dbName: process.env.MONGODB_DB || "restAPI",
    bufferCommands: false,
    serverSelectionTimeoutMS: 10000
  });
  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }
  return cached.conn;
}
