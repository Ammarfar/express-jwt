const { checkDuplicateUsernameOrEmail, checkRolesExisted } = require("../middleware/auth");
const { register, login } = require("../controllers/auth");

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

    app.post(
        `${prefix}login`,
        login
    );
};