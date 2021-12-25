import mongoose from 'mongoose';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import output from '../helpers/output.js';

const authController = {
    login: async function(req, res) {
        //validate the request body first
        const { error } = validateUser(req.body);
        if (error) return output.error(res, error.details[0].message);

        //find an existing user
        let user = await mongoose.model('User').findOne({ email: req.body.email });
        if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
            return output.error(res, "User does not exist.");
        }

        const token = user.generateAuthToken();
        res.header("x-auth-token", token).send({
            _id: user._id,
            name: user.name,
            email: user.email,
            shows: user.shows,
            archivedShows: user.archivedShows,
        });
    },
    register: async function(req, res) {
        // validate the request body first
        const { error } = validateUser(req.body, true);
        if (error) return output.error(res, error.details[0].message);

        //find an existing user
        let user = await mongoose.model('User').findOne({ email: req.body.email });
        if (user) return output.error(res, "User already registered.");

        /*eslint new-cap: ["error", { "newIsCap": false }]*/
        user = new mongoose.model('User')({
          name: req.body.name,
          password: req.body.password,
          email: req.body.email,
          shows: req.body.shows,
          archivedShows: req.body.archivedShows,
        });
        user.password = await bcrypt.hash(user.password, 10);
        await user.save();

        const token = user.generateAuthToken();
        res.header("x-auth-token", token).send({
          _id: user._id,
          name: user.name,
          email: user.email,
          archivedShows: user.archivedShows,
        });
    },
    current: async function(req, res) {
        const user = await mongoose.model('User').findById(req.user._id).select("-password");
        res.send(user);
    }
};

function validateUser(user, nameRequired=false) {
    const defaultKeys = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(3).max(255).required()
    };
    let schema = Joi.object(defaultKeys);

    if (nameRequired) {
        schema = Joi.object({...defaultKeys, ...{
            name: Joi.string().min(3).max(50).required(),
            shows: Joi.array().required(),
            archivedShows: Joi.array(),
        }});
    }

    return schema.validate(user);
}

export default authController;