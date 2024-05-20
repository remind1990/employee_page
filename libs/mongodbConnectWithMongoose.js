// libs/mongodb.js
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

// Global is used here to maintain a single instance across the module
global.mongoose = global.mongoose || {};

let isConnected = global.mongoose.isConnected || false;
let clientBaseDB = global.mongoose.clientBaseDB || null;

const collections = new Map();

const setupCollections = (db) => {
  if (!db.models.Client) {
    db.model('Client', ClientSchema, 'clientsCollection');
  }
  if (!db.models.Translator) {
    db.model('Translator', TranslatorSchema, 'translatorCollection');
  }
  if (!db.models.BalanceDay) {
    db.model('BalanceDay', BalanceDaySchema, 'balanceDayCollection');
  }

  collections.set('collectionClients', db.models.Client);
  collections.set('collectionClientsOnTranslators', db.models.Client);
  collections.set('collectionTranslators', db.models.Translator);
  collections.set('collectionBalanceDays', db.models.BalanceDay);
};

export const mongooseConnectDB = async () => {
  if (isConnected) {
    console.log('=> using existing database connection');
    return;
  }

  try {
    const connectionString = changeDatabaseInConnectionString(DB, 'clientBase');
    clientBaseDB = await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB with Mongoose:');

    isConnected = true;
    global.mongoose.isConnected = isConnected;
    global.mongoose.clientBaseDB = clientBaseDB;

    setupCollections(clientBaseDB);
  } catch (error) {
    console.error('Mongoose connection error:', error);
    throw new Error('Could not connect to database');
  }
};

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
  if (!collections.size && clientBaseDB) {
    setupCollections(clientBaseDB);
  }
  return COLLECTION_NAMES.reduce((collectionsObject, collectionName) => {
    collectionsObject[collectionName] = collections.get(collectionName);
    return collectionsObject;
  }, {});
};
