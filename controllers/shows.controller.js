import mongoose from 'mongoose';
const Joi = require('joi');

const showsController = {
    index: async function(req, res) {
        const user = await mongoose.model('User').findById(req.user._id).select('shows');
      
        return res.send(user.shows);
    },
    archived: async function(req, res) {
        const user = await mongoose.model('User').findById(req.user._id).select('archivedShows');
      
        return res.send(user.archivedShows);
    },
    store: async function(req, res) {
        const user = await mongoose.model('User').findById(req.user._id).select('shows');
        user.shows = req.body.shows;
        await user.save();
      
        return res.send(user);
    }
}

module.exports = showsController;