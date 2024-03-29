import mongoose from 'mongoose';
import Joi from 'joi';
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
        let schema = Joi.array().required();
        const { error } = schema.validate(req.body);
        if (error) return output.error(res, error.details[0].message);

        const user = await mongoose.model('User').findById(req.user._id).select('shows');
        user.shows = req.body;
        await user.save();

        return res.send(user);
    },
    storeArchived: async function(req, res) {
        let schema = Joi.array().required();
        const { error } = schema.validate(req.body);
        if (error) return output.error(res, error.details[0].message);

        const user = await mongoose.model('User').findById(req.user._id).select('archivedShows');
        user.archivedShows = req.body;
        await user.save();

        return res.send(user);
    }
};

export default showsController;