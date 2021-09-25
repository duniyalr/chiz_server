const net = require("net");
const stpStack = require("./stpStack");
const port = process.env.port || 8080;

setupServer();

function setupServer() {
    const server = net.createServer(stpStack()); 
    server.listen(port);
}