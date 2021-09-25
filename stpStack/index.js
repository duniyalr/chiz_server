const stpStack = require("./stpStack");

module.exports = function setupStack () {
    const _stpStack = new stpStack();
    return _stpStack.__onConnection.bind(_stpStack);
}