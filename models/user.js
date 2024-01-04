import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  shows: [
    {
      id: Number,
      seasons_watched: [Number],
      note: {
        type: String,
        maxlength: 2000,
      },
    },
  ],
  archivedShows: [
    {
      name: String,
      number_of_seasons: Number,
      last_aired_season: Number,
      showIdIndex: Number,
      id: Number,
    },
  ],
});

//custom method to generate authToken
UserSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_PRIVATE_KEY);
};

const User = mongoose.model("User", UserSchema);

exports.User = User;
