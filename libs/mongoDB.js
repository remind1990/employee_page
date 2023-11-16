import { MongoClient } from 'mongodb';

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

const client = new MongoClient(DB);
const collections = new Map();

const connectToDatabase = async () => {
  await client.connect();
  console.log('Connected to MongoDB database');

  collections.set(
    'collectionTranslators',
    client.db('translatorsDB').collection('translators')
  );
};

export { connectToDatabase, client, collections };
