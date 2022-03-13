import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;

const handleOpen = () => console.log('✅ connected to DB');

const handleError = (error) => {
  console.log(`⛔ error with DB connection : ${error}`);
};

db.once('open', handleOpen);
db.on('error', handleError);
