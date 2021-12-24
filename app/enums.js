const enumMaker = require("../utils/enum");

module.exports = {
    ACCESS: enumMaker([
        "PUBLIC", 
        "USER"
    ]),

    ROUTE: enumMaker([
        "LOGIN",
        "GET_FACTORY",
        "GET_ACTIVE_FACTORY"
    ])
}