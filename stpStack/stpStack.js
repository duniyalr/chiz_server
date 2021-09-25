const stp = require("../stp")

module.exports = StpStack;

function StpStack() {
    this.stack = new Map();
}

/**
 * will call on the new connection from the net emitter;
 * @api public
 * @param {Socket} [socket] a socket that should wrap in the stp and then add to the stack;
 * @return {undefined}
 */
StpStack.prototype.__onConnection = function __onConnection(socket) {
    const _stp = stp(socket);
    return _stp;
}