const { responseError } = require("../helpers/response");
const { isUsername, isEmail, checkRole, isRole } = require("../repository/auth");

module.exports = {
    async checkDuplicateUsernameOrEmail(req, res, next) {

        if (await isUsername(req)) return res.status(400).send(responseError("Failed! Username is already in use!"));

        if (await isEmail(req)) return res.status(400).send(responseError("Failed! Email is already in use!"));

        next();
    },

    checkRolesExisted(req, res, next) {

        if (role = checkRole(req)) return res.status(400).send(responseError(`Failed! Role does not exist = ${role}`));

        next();
    },

    async isAdmin(req, res, next) {

        if (await isRole(req, 'admin')) return res.status(403).send(responseError("Require Admin Role"));

        next();
    },

    async isModerator(req, res, next) {

        if (await isRole(req, 'moderator')) return res.status(403).send(responseError("Require Moderator Role"));

        next();
    }
}