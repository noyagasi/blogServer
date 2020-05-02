const Hapi = require("hapi");
const dbManager = require("./dbManager");

dbManager.dbInit();

const server = new Hapi.Server({
    "host": "localhost",
    "port": 3000
});

// Starts server
server.start(error => {
    if (error) {
        throw error;
    }
    console.log("Listening at " + server.info.uri);
})

// Shuts server down and closes DB connection when app exits
process.on("SIGINT", function () {
    serverInstance.close();
    dbManager.closeConnection();
});

module.exports = server;