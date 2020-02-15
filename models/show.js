import mongoose from 'mongoose';

const showSchema = new mongoose.Schema({
  id: Number,
  seasons_watched: [Number],
});

const Show = mongoose.model('Show', showSchema);

export default Show;