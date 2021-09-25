const enums = require("./enums");
const bufferSeeker = require("../utils/bufferSeeker");
const TYPE = enums.TYPE;

module.exports = Parser;

function Parser() {
    this.bufferSeeker = new bufferSeeker();
    this.typePatternCursors = [];
}

Parser.prototype.__parse = function __parse(buf) {
    //console.log(buf);
    this.bufferSeeker.__reset(buf)
    const res = this.parse(-1, TYPE.VOID);
    return res;
}

Parser.prototype.parse = function parse(length, lockType) {
    const stack = [];
    let size = 0;
    let type = null;
    this.typePatternCursors.push(0);
    while (this.whiler(stack, length)) {
        type = this.typer(lockType);
        //console.log(type, this.bufferSeeker.seek)
        if (length > 0) length--;
        let elm;
        switch(type) {
            case TYPE.BOOL:
                elm = Boolean(this.bufferSeeker.__readUInt8());
                break;
            case TYPE.INT8:
                elm = this.bufferSeeker.__readInt8();
                break;
            case TYPE.INT16:
                elm = this.bufferSeeker.__readInt16();
                break;
            case TYPE.INT32:
                elm = this.bufferSeeker.__readInt32();
                break;
            case TYPE.UINT8:
                elm = this.bufferSeeker.__readUInt8();
                break;
            case TYPE.UINT16:
                elm = this.bufferSeeker.__readUInt16();
                break;
            case TYPE.UINT32:
                elm = this.bufferSeeker.__readUInt32();
                break;
            case TYPE.CHAR:
                elm = this.bufferSeeker.__readUInt8();
                break;
            case TYPE.STRING:
                const stringLength = this.bufferSeeker.__readUInt16();
                elm = this.bufferSeeker.__readString(stringLength);
                break;
            case TYPE.ARRAY:
                const arrayLength = this.bufferSeeker.__readUInt16();
                const _type = this.bufferSeeker.__readUInt8();
                elm = this.parse(arrayLength, _type);
                break;
            case TYPE.ARRAY_COMPLEX:
                const _arrayLength = this.bufferSeeker.__readUInt16();
                elm = this.parse(_arrayLength, TYPE.VOID);
                break;
            case TYPE.DICTIONARY:
                const propertyLength = this.bufferSeeker.__readUInt16();
                const keys = this.parse(propertyLength, TYPE.STRING);
                const types = this.parse(propertyLength, TYPE.UINT8);
                const values = this.parse(propertyLength, types);
                elm = this.dictionaryFromArrays(keys, values);
        }
        stack.push(elm);
    }
    this.typePatternCursors.pop();
    return stack;
}

Parser.prototype.whiler = function whilere(stack, length) {
    if (length === -1) {
        return Boolean(this.bufferSeeker.seek + 1 < this.bufferSeeker.buffer.length);
    }

    return length > 0;
}

Parser.prototype.typer = function typer(lockType) {
    if (Array.isArray(lockType)) {
        const cursor = this.typePatternCursors[this.typePatternCursors.length - 1];
        this.typePatternCursors[this.typePatternCursors.length - 1]++;
        return lockType[cursor % lockType.length];
    }

    if (TYPE.VOID === lockType)
        return this.bufferSeeker.__readUInt8();
    
    return lockType;
}

Parser.prototype.dictionaryFromArrays = function dictionaryFromArrays(keys, values) {
    //console.log(keys, values)
    const dictionary = {};
    for (const i in keys) {
        dictionary[keys[i]] = values[i];
    }

    return dictionary;
}