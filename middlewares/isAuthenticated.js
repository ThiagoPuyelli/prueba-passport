module.exports = (req, res, next) => {
    console.log(req.isAuthenticated())
    if(req.isAuthenticated()){
        return next();
    } else {
        res.json("The user is not authenticated");
        next(null, false);
    }
}