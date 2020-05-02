const fs = require("fs");
const jwt = require("jsonwebtoken");
const priFileName = __dirname + "/../Keys/private.key";

// use 'utf8' to get string instead of byte array  (512 bit key)
var privateKEY = fs.readFileSync(priFileName, "utf8");
module.exports = {
    sign: (payload) => {
        return jwt.sign(payload, privateKEY); //token
    },
    verify: (token) => {
        try {
            return jwt.verify(token, privateKEY);
        } catch (err) {
            console.log(err);
            return false;
        }
    },
    decode: (token) => {
        return jwt.decode(token, { complete: true });
        //returns null if token is invalid
    }
}