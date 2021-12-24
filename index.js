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

const net = require("net");
const stpStack = require("./stpStack");
const port = process.env.port || 8080;

setupServer();

function setupServer() {
    const server = net.createServer(stpStack()); 
    server.listen(port);
}