const router = require("./router");

module.exports = setupRouter;

function setupRouter() {
    const _router = new router();

    return _router;
}