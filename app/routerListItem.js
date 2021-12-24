const router = require("../router/router");

module.exports = routerListItem;

function routerListItem(routerId, access, func) {
    return new function() {
        this.routerId = routerId;
        this.access = access;
        this.func = func;
    }
}