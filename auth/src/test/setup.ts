import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
// import jest from '@types/jest'

import { app } from '../app';

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = 'hbdhbjhbjz';

  mongo = await MongoMemoryServer.create();
  const mongoURI = mongo.getUri();

  await mongoose.connect(mongoURI);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});