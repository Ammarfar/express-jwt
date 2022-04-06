const bcrypt = require("bcryptjs/dist/bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { secret } = require("../config/constant");
const { responseApi } = require("../helpers/response");
const { register, getUserByEmail } = require("../repository/auth");

module.exports = {
    async register(req, res) {

        if (error = await register(req)) res.status(500).send(responseApi(error, null, true));

        res.status(200).send(responseApi("User was registered successfully!"));
    },

    async login(req, res) {

        try {
            const user = await getUserByEmail(req);

            if (!user) return res.status(404).send(responseApi("User Not found.", null, true));

            const passwordIsValid = await bcrypt.compareSync(req.body.password, user.password);

            if (!passwordIsValid) return res.status(401).send(responseApi("Invalid Password!", null, true));

            const token = jsonwebtoken.sign({ id: user.id }, secret, { expiresIn: 86400 });  // 24 hours

            data = {
                token: token,
                userId: user.id,
                username: user.username,
                email: user.email,
                roles: user.roles,
            };

            res.status(200).send(responseApi("Succesfully Login!", data))
        } catch (error) {
            res.status(500).send(responseApi(error, null, true));
        }
    },
}
