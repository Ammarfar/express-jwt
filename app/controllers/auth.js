const { responseApi } = require("../helpers/response");
const { register } = require("../repository/auth");

module.exports = {
    async register(req, res) {

        if (error = await register(req)) res.status(500).send(responseApi(error, null, true));

        res.status(200).send(responseApi("User was registered successfully!"));
    },
}
