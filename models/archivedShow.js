import mongoose from 'mongoose';

const archivedShowSchema = new mongoose.Schema({
  name: String,
  number_of_seasons: Number,
  last_aired_season: Number,
  showIdIndex: Number,
  id: Number,
});

const ArchivedShow = mongoose.model('ArchivedShow', archivedShowSchema, 'archived_shows');

export default ArchivedShow;