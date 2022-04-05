const { responseApi } = require("../helpers/response");
const { isUsername, isEmail, checkRole } = require("../repository/auth");

module.exports = {
    async checkDuplicateUsernameOrEmail(req, res, next) {

        if (await isUsername(req)) return res.status(400).send(responseApi("Failed! Username is already in use!", null, true));

        if (await isEmail(req)) return res.status(400).send(responseApi("Failed! Email is already in use!", null, true));

        next();
    },

    checkRolesExisted(req, res, next) {

        if (role = checkRole(req)) return res.status(400).send(responseApi(`Failed! Role does not exist = ${role}`, null, true));

        next();
    }
}