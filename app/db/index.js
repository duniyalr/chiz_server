const dbConnectionManager = require("./dbConnectionManager");

const connectionsLength = 10;
const dbUrl = "mongodb://localhost:27017";
const dbName = "chiz";

module.exports = {
    manager: new dbConnectionManager(connectionsLength, dbUrl, dbName)
}