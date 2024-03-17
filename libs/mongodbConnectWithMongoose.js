import mongoose from 'mongoose';
import {
  BalanceDaySchema,
  ClientSchema,
  TranslatorSchema,
} from '../models/Schemas';
import { changeDatabaseInConnectionString } from '../utils/utils';
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

export const mongooseConnectDB = async () => {
  console.log('mongoose is called');
  try {
    const connectionString = changeDatabaseInConnectionString(DB, 'clientBase');
    const clientBaseDB = mongoose.createConnection(connectionString);
    console.log(
      'Attempting to connect to MongoDB with Mongoose:',
      connectionString
    );
    clientBaseDB.on('error', (error) => {
      console.error('Mongoose connection error:', error);
    });

    clientBaseDB.on('connected', () => {
      console.log('Connected to Mongoose');
    });
    const Client = clientBaseDB.model(
      'Client',
      ClientSchema,
      'clientsCollection'
    );
    const Translator = clientBaseDB.model(
      'Translator',
      TranslatorSchema,
      'translatorCollection'
    );
    const BalanceDay = clientBaseDB.model(
      'BalanceDay',
      BalanceDaySchema,
      'balanceDayCollection'
    );
    collections.set('collectionClients', Client);
    collections.set('collectionClientsOnTranslators', Client);
    collections.set('collectionTranslators', Translator);
    collections.set('collectionBalanceDays', BalanceDay);
  } catch (error) {
    console.log(error);
  }
};

const collections = new Map();

export const COLLECTION_NAMES = [
  'collectionTasks',
  'collectionBalance',
  'collectionTaskNotifications',
  'collectionClients',
  'collectionTranslators',
  'collectionStatements',
  'collectionAdmins',
  'collectionBalanceDays',
];

export const getCollections = () => {
  return COLLECTION_NAMES.reduce((collectionsObject, collectionName) => {
    collectionsObject[collectionName] = collections.get(collectionName);
    return collectionsObject;
  }, {});
};
