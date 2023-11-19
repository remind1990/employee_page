import mongoose from 'mongoose';

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
const mongooseConnectDB = async () => {
  try {
    await mongoose.connect(DB);
    console.log('Connected to database with Mongoose');
  } catch (err) {
    console.log(err);
  }
};

export default mongooseConnectDB;
