const stp = require("../stp")
const {db, routerList} = require("../app");
const router = require("../router");

module.exports = StpStack;

function StpStack() {
    this.stack = new Map();
    this.router = router();
    this.router.__setList(routerList);
}

/**
 * will call on the new connection from the net emitter;
 * @api public
 * @param {Socket} [socket] a socket that should wrap in the stp and then add to the stack;
 * @return {undefined}
 */
StpStack.prototype.__onConnection = function __onConnection(socket) {
    const _stp = stp(socket, this);
    return _stp;
}

StpStack.prototype.__route = function __route(msg) {
    console.log(msg)
}