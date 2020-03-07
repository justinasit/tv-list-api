import mongoose from 'mongoose';
import User from './user';

const connectDb = () => mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const models = { User };

export { connectDb };

export default models;