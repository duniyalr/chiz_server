const stp = require("../stp")
const {db, routerList, accessList} = require("../app");
const router = require("../router");

module.exports = StpStack;

function StpStack() {
    this.stack = new Map();
    this.router = router();
    this.router.__setList(routerList);
    this.router.__setAccessList(accessList);
    this.router.__setDB(db.manager);
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

// a wrapper for router.__route
StpStack.prototype.__route = function __route(req, state, res) {
    this.router.__route(req, state, res);
}