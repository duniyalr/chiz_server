const routerListItem = require("./routerListItem");
const accessListItem = require("./accessListItem");
const access = require("./access");
const passport = require("./passport");
const factory = require("./factory")
const {ACCESS, ROUTE} = require("./enums");
const db = require("./db");

const routerList = [
    routerListItem(
        ROUTE.LOGIN,
        ACCESS.PUBLIC,
        passport.login
    ),
    routerListItem(
        ROUTE.GET_FACTORY,
        ACCESS.USER
    ),
    routerListItem(
        ROUTE.GET_ACTIVE_FACTORY,
        ACCESS.USER,
        factory.getActiveFactory
    )
];

console.log(routerList)
const accessList = [
    accessListItem(
        ACCESS.PUBLIC,
        access.public
    ),
    accessListItem(
        ACCESS.USER, 
        access.user
    )
]

module.exports = {
    db,
    routerList,
    accessList
}