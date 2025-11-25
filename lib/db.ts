import mongoose from 'mongoose';

const { MONGODB_URI, MONGODB_DB_NAME } = process.env;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is not set in the environment');
}

declare global {
  // eslint-disable-next-line no-var, @typescript-eslint/no-explicit-any
  var __mongooseCache: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } | undefined;
}

const cached = global.__mongooseCache || { conn: null, promise: null };

if (!global.__mongooseCache) {
  global.__mongooseCache = cached;
}

export const connectToDatabase = async (): Promise<typeof mongoose> => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: MONGODB_DB_NAME || 'health-node',
      bufferCommands: false
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

