const router = require("express").Router();
const passport = require("passport");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.post("/signup", passport.authenticate("basic"), passport.authenticate("local-signup"), (req, res) => res.json("Registro completado"))
router.get("/pepe", isAuthenticated, (req, res) => res.json("pepe"))
router.post("/signin", passport.authenticate("local-signin"), (req, res) => res.json("Logeo"))

module.exports = router;