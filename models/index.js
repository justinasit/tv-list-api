import mongoose from 'mongoose';
import User from './user.js';

const connectDb = () => mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DATABASE_NAME
});

const models = { User };

export { connectDb };

export default models;