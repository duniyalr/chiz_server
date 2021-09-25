const admin = require("./admin");

/**
 * 
 * @param {socket} socket 
 * @return {stp}
 */
module.exports = function setupStp(socket, stpStack) {
    const _admin = new admin(socket, stpStack);

    
    return _admin;
}