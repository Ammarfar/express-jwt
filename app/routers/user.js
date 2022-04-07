const { user, admin, moderator } = require("../controllers/user");
const { isAdmin, isModerator } = require("../middleware/auth");
const { verifyToken } = require("../middleware/jwt");

module.exports = function (app) {
    var prefix = "/api/user/";

    app.get(
        `${prefix}user`,
        [
            verifyToken
        ],
        user
    );

    app.get(
        `${prefix}admin`,
        [
            verifyToken,
            isAdmin
        ],
        admin
    );

    app.get(
        `${prefix}moderator`,
        [
            verifyToken,
            isModerator
        ],
        moderator
    );
};