const { responseSuccess } = require("../helpers/response");

module.exports = {
    async user(req, res) {
        res.status(200).send(responseSuccess("user content!", req.userId));
    },

    async admin(req, res) {
        res.status(200).send(responseSuccess("admin content!"));
    },

    async moderator(req, res) {
        res.status(200).send(responseSuccess("moderator content!"));
    }
}