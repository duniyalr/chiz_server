const makeConnection = require("./makeConnection");

module.exports = dbConnectionManager;

function dbConnectionManager(length, url, db) {
    this.connections = new Array(length);
    this.seek = 0;
    this.length = length;
    this.makeConnections(url, db);
}

dbConnectionManager.prototype.makeConnections = async function makeConnections(url, db) {
    for(let i = 0; i < this.length; i++) {
        this.connections[i] = await makeConnection(url, db);
        // console.log('db > '+i+' new connection: ', Date.now());
    }
}

// returns the connection in round robin order;
dbConnectionManager.prototype.__getConn = function __getConn() {
    if (this.length === this.seek) this.seek = 0;
    return this.connections[this.seek];
}