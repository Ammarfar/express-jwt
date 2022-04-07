module.exports = (app) => {

    // simple route
    app.get("/", (req, res) => {
        res.json({ message: "Welcome to express-jwt application." });
    });

    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // route list
    require('./auth')(app);
    require('./user')(app);
}