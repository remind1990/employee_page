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
  collections.set(
    'collectionClients',
    client.db('clientsDB').collection('clients')
  );
};

export { connectToDatabase, client, collections };
