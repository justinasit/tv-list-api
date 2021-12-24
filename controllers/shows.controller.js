import mongoose from 'mongoose';
import Joi from 'joi';
import output from '../helpers/output.js';
import * as MovieAPI from '../lib/MovieApi.js';

const showsController = {
    index: async function(req, res) {
        const user = await mongoose.model('User').findById(req.user._id).select('shows');

        user.shows.forEach(async (show) => {
            const showDetails = await MovieAPI.getInfoById(show.id);
            console.log("showDetails: ", showDetails);
        });
      
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

export default showsController;