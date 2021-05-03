const mongoose = require("mongoose");

const uri = "mongodb://localhost:27017/passport";

module.exports = mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(connect => console.log("Connect to a database"))
.catch(err => console.log(err))