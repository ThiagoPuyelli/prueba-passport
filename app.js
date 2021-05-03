const express = require("express");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
const userRoutes = require("./routes/user.routes");

module.exports = (app) => {

    // INITIALIZATION
    require("./middlewares/passport");
    
    // PORT
    app.set("port", process.env.PORT || 7000);

    // DATABASE
    require("./database");

    // MIDDLEWARES
    app.use(morgan("dev"))
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());
    app.use(session({
        secret: "elpepe123",
        resave: false,
        saveUninitialized: false
    }))
    app.use(passport.initialize());
    app.use(passport.session());

    // CORS
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, x-access-token');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        next();
    });

    // ROUTES

    app.use(userRoutes);

    // RETURN

    return app

}