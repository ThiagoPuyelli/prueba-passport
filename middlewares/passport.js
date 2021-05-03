const passport = require("passport"),
      LocalStrategy = require("passport-local").Strategy,
      BasicStrategy = require("passport-http").BasicStrategy;
const UserModel = require("../models/User.model");
const { encryptPassword, comparePassword } = require("../methods/methods"); 
const AdminModel = require("../models/Admin.model");

passport.serializeUser((user, done) => {
    done(null, user._id);
})

passport.deserializeUser(async (id, done) => {
    const user = await UserModel.findById(id);
    done(null, user);
})

passport.use("local-signup", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, async (req, email, password, done) => {
   const userEmail = await UserModel.findOne({email});
   if(userEmail) return done(null, false, {message: "El email ya existe"});
    
   const user = new UserModel();
   user.email = email;
   user.password = await encryptPassword(password);
   await user.save();
   done(null, user); 
}))

passport.use("basic", new BasicStrategy(
    async (username, password, done) => {
        const user = await AdminModel.findOne({username});
        if(!user) done(null, false);
        if(!await comparePassword(password, user.password)) done(null, false);
        done(null, user);
    }
))

passport.use("local-signin", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
}, async (email, password, done) => {
    const user = await UserModel.findOne({email});
    if(!user) done(null, false);
    if(!await comparePassword(password, user.password)) done(null, false);
    done(null, user);
}))

module.exports = passport;