const connectionHandler = require("./connectionHandler");
const messenger = require("./messenger");
const parser = require("./parser");
const serializer = require("./serializer");

module.exports = admin;

function admin(socket) {
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
}

admin.prototype.__onMessage = function __onMessage(message) {
    if (message.bodyLength !== 0) {
        message.params = this.parser.__parse(message.bodyBuffer);
    }

    console.log(message)
}

admin.prototype.__setState = function __setState(state) {
    this.state = state;
}