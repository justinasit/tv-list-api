const output = {
    error: function(res, message) {
        return res.status(400).send({message: message});
    },
};

export default output;