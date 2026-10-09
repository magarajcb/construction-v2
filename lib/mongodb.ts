import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined");
}

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalWithMongoose = global as typeof globalThis & {
  mongoose?: MongooseCache;
};

const cached: MongooseCache =
  globalWithMongoose.mongoose ??
  (globalWithMongoose.mongoose = { conn: null, promise: null });

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    // No directConnection: the driver must find the cluster's primary to write.
    cached.promise = mongoose.connect(MONGODB_URI!, {
      serverSelectionTimeoutMS: 10000,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null; // let the next request retry instead of failing forever
    throw error;
  }

  return cached.conn;
}