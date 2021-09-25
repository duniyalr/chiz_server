const routerListItem = require("./routerListItem");
const accessListItem = require("./accessListItem");
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
        ACCESS.PUBLIC
    )
]

module.exports = {
    db,
    routerList,
    accessList
}