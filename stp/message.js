module.exports = Message;

function Message() {
    this.version = null;
    this.bodyLength = null;
    this.id = null;
    this.requestId = null;
    this.route = null;

    this.bodyBuffer = null;
    this.params = null;
}

Message.prototype.__setHeaders = function __setHeaders() {

}