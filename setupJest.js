import 'regenerator-runtime/runtime';
import mongoose from 'mongoose';

process.env.DATABASE_URL = 'mongodb://127.0.0.1/shows_test';
process.env.DATABASE_NAME = 'shows_test';

const refreshDB = async () => {
    await mongoose.model('User').deleteMany({});
}

export default refreshDB;