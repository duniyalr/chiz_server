const connectionHandler = require("./connectionHandler");
const messenger = require("./messenger");
const parser = require("./parser");
const serializer = require("./serializer");
const response = require("./response");

module.exports = admin;

function admin(socket, stpStack) {
    this.stpStack = stpStack;
    this.state = null;
    this.socket = socket;
    this.messenger = new messenger();
    this.messenger.onMessage = this.__onMessage.bind(this);
    this.connectionHandler = new connectionHandler();
    this.parser = new parser();
    this.serializer = new serializer();

    
    // setup the listeners
    socket.on("data", this.messenger.__onData.bind(this.messenger));

    socket.on("close", this.connectionHandler.__onClose);
    socket.on("error", this.__onSocketError.bind(this));
}

admin.prototype.__onMessage = function __onMessage(message) {
    if (message.bodyLength !== 0) {
        message.params = this.parser.__parse(message.bodyBuffer);
    }
    
    const _response = new response(message.id, this);
    this.stpStack.__route(message, this.state, _response);
}

admin.prototype.__setState = function __setState(state) {
    this.state = state;
}

// just a wrapper
admin.prototype.__serialize = function __serialize(data) {
    return this.serializer.__serialize(data);
}

admin.prototype.__send = function __send(buf) {
    this.socket.write(buf);
}

admin.prototype.__onSocketError = function __onSocketError() {
    console.log('socket error');
}