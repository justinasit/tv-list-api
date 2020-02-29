import mongoose from 'mongoose';
import Show from './show';
import ArchivedShow from './archivedShow';

const connectDb = () => mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const models = { Show, ArchivedShow };

export { connectDb };

export default models;