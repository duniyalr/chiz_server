const routerListItem = require("./routerListItem");
const accessListItem = require("./accessListItem");
const access = require("./access");
const {ACCESS, ROUTE} = require("./enums");
const db = require("./db");

const routerList = [
    routerListItem(
        ROUTE.LOGIN,
        ACCESS.PUBLIC,

    ),
];

const accessList = [
    accessListItem(
        ACCESS.PUBLIC,
        access.login
    )
]

module.exports = {
    db,
    routerList,
    accessList
}