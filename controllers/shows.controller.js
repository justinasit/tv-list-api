import mongoose from 'mongoose';
const Joi = require('joi');
import output from '../helpers/output';

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
        const { error } = Joi.validate(req.body, Joi.array().required());
        if (error) return output.error(res, error.details[0].message);

        const user = await mongoose.model('User').findById(req.user._id).select('shows');
        user.shows = req.body;
        await user.save();
      
        return res.send(user);
    },
    storeArchived: async function(req, res) {
        const { error } = Joi.validate(req.body, Joi.array().required());
        if (error) return output.error(res, error.details[0].message);

        const user = await mongoose.model('User').findById(req.user._id).select('archivedShows');
        user.archivedShows = req.body;
        await user.save();
      
        return res.send(user);
    }
}

module.exports = showsController;