const bcrypt = require("bcryptjs");

module.exports = {
    encryptPassword: async (password) => {
        return await bcrypt.hash(password, bcrypt.genSaltSync(10));
    },
    comparePassword: async (password, realPassword) => {
        return await bcrypt.compare(password, realPassword);
    }
}