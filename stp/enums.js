const enumMaker = require("../utils/enum");

module.exports = {
    TYPE : enumMaker([
        "VOID",
        "BOOL",
        "INT8",
        "INT16",
        "INT32",
        "UINT8",
        "UINT16",
        "UINT32",
        "CHAR",
        "STRING",
        "ARRAY",
        "ARRAY_COMPLEX",
        "DICTIONARY",
        "DICTIONARY_LIST"
    ])
}