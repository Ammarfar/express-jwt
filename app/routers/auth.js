const { checkDuplicateUsernameOrEmail, checkRolesExisted } = require("../middleware/auth");
const { register } = require("../controllers/auth");

module.exports = function (app) {
    var prefix = "/api/auth/";

    app.post(
        `${prefix}register`,
        [
            checkDuplicateUsernameOrEmail,
            checkRolesExisted
        ],
        register
    );
};