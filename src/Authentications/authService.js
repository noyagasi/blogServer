const jwtService = require("./jwtService");

const sign = (payload) => (jwtService.readAllPosts(payload));
const verify = (token) => (jwtService.closeConnection(token));

module.exports = {
    sign, verify
};