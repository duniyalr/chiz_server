module.exports = response;

function response(requestId, stp) {
    this.requestId = requestId;
    this.stp = stp;
}

response.prototype.__response = function __response(respBody) {
    const respBuffer = this.stp.__serialize(respBody);
    // set the headers
    respBuffer.writeUInt16BE(1, 0);
    respBuffer.writeUInt32BE(respBuffer.length - 12, 2);
    respBuffer.writeUInt16BE(this.requestId, 8);
    this.stp.__send(respBuffer);
}

response.prototype.__routerError = function __routerError(err) {
    console.log("error from router.");
    throw err;
}