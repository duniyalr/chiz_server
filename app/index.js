const routerListItem = require("./routerListItem");
const {ACCESS, ROUTE} = require("./enums");
const db = require("./db");

const routerList = [
    routerListItem(
        ROUTE.LOGIN,
        ACCESS.PUBLIC,

    ),
]

module.exports = {
    db,
    routerList
}