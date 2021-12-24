// just for test
const {Buffer} = require("buffer")
Buffer.prototype.makeCouple = function() {
    const str = this.toString('hex');
    const res = []
    for(let i = 0; i < str.length; i+= 2) {
        if (i % 24 === 0) res.push("\n");
        res.push(str.substr(i, 2))
    }
    return res.join(" ");
}


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
    console.log(respBuffer.makeCouple(), respBody.units)
    this.stp.__send(respBuffer);
}

response.prototype.__routerError = function __routerError(err) {
    console.log("error from router.");
    throw err;
}

response.prototype.__setState = function __setState(state) {
    this.stp.state = state;
}