import mongoose from 'mongoose';
import Show from './show';

const connectDb = () => mongoose.connect(process.env.DATABASE_URL);

const models = { Show };

export { connectDb };

export default models;