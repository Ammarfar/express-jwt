const jwt = require("jsonwebtoken");
const { secret } = require("../config/constant");
const { responseError } = require("../helpers/response");

module.exports = {
    verifyToken(req, res, next) {

        let token = req.headers["x-access-token"];

        if (!token) return res.status(403).send(responseError("No token provided!"));

        jwt.verify(token, secret, (err, decoded) => {
            if (err) return res.status(401).send(responseError("Unauthorized!"));
            req.userId = decoded.id;
            next();
        });
    }
}