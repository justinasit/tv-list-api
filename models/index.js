import mongoose from 'mongoose';
import Show from './show';
import ArchivedShow from './archivedShow';
import User from './user';

const connectDb = () => mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const models = { Show, ArchivedShow, User };

export { connectDb };

export default models;