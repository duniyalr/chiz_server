const enumMaker = require("../utils/enum");

module.exports = {
    ACCESS: enumMaker([
        "PUBLIC", 
        "PRIVATE"
    ]),

    ROUTE: enumMaker([
        "LOGIN"
    ])
}