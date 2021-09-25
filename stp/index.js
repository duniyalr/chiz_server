const admin = require("./admin");

/**
 * 
 * @param {socket} socket 
 * @return {stp}
 */
module.exports = function setupStp(socket) {
    const _admin = new admin(socket);

    
    return _admin;
}