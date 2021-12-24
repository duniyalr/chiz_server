const enums = require("./enums");
const bufferWriter = require('../utils/bufferWriter');
const TYPE = enums.TYPE;

module.exports = serializer;

function serializer() {
    this.bufferWriter = new bufferWriter();
    // test ===

    //=== test
}

serializer.prototype.__serialize = function __serialize(data) {
    // test ===
        this.bufferWriter.requestBuffer();
    // === test

    if (!Array.isArray(data)) data = [data];
    this.serialize(data);
    const res = this.bufferWriter.__collect(12 /*this is size of the header*/);
    this.bufferWriter.__clean();
    return res;
}
// WARNING
// we can just remove writeValue and because its use is so few make another function 
// and pass the value there for this work;
serializer.prototype.serialize = function serialize(data, writeType = true, writeValue = true) {
    for (let item of data) {
        const _type = typeof item;
        switch(_type){
            case 'boolean': 
                if (writeType) this.bufferWriter.__writeUInt8(TYPE.BOOL);
                if (writeValue) this.bufferWriter.__writeUInt8(item ? 1 : 0);
                break;
            case 'number':
                let _typeItem;
                if (item < 0) {
                    if (isInIntval(item, -128, 127)){
                        if (writeType) this.bufferWriter.__writeUInt8(TYPE.INT8);
                        if (writeValue) this.bufferWriter.__writeInt8(item);
                    } else if (isInIntval(item, -32768, 32767)) {
                        if (writeType) this.bufferWriter.__writeUInt8(TYPE.INT16);
                        if (writeValue) this.bufferWriter.__writeInt16(item);
                    // WARNING if a number is bigger than 32bit it just not work;
                    } else {
                        if (writeType) this.bufferWriter.__writeUInt8(TYPE.INT32);
                        if (writeValue) this.bufferWriter.__writeInt32(item);
                    }
                } else {
                    if (item < 256){
                        if (writeType) this.bufferWriter.__writeUInt8(TYPE.UINT8);
                        if (writeValue) this.bufferWriter.__writeUInt8(item);
                    } else if (item < 65536) {
                        if (writeType) this.bufferWriter.__writeUInt8(TYPE.UINT16);
                        if (writeValue) this.bufferWriter.__writeUInt16(item);
                    // WARNING if a number is bigger than 32bit it just not work;
                    } else {
                        if (writeType) this.bufferWriter.__writeUInt8(TYPE.UINT32);
                        if (writeValue) this.bufferWriter.__writeUInt32(item);
                    }
                }
                break;
            case 'string':
                if (item.length === -1) {
                    // char makes a bug in serializing for dictionaries
                    // if you want to active then you should consider that
                    if (writeType) this.bufferWriter.__writeUInt8(TYPE.CHAR);
                    if (writeValue) this.bufferWriter.__writeString(item);
                } else {
                    if (writeType) this.bufferWriter.__writeUInt8(TYPE.STRING);
                    if (writeValue) {
                        this.bufferWriter.__writeUInt16(item.length);
                        this.bufferWriter.__writeString(item);
                    }
                }
                break;
            case 'object':
                if (Array.isArray(item)) {
                    // at this point there is no fixed type array;
                    if (writeType) this.bufferWriter.__writeUInt8(TYPE.ARRAY_COMPLEX);
                    if (writeValue) {
                        this.bufferWriter.__writeUInt16(item.length);
                        this.serialize(item);
                    }
                } else {
                    let arr = null;
                    if(item.dictionaryList) {
                        arr = item.array;
                        item = arr[0];
                    } 
                    if (writeType) 
                        this.bufferWriter.__writeUInt8(arr ? TYPE.DICTIONARY_LIST : TYPE.DICTIONARY);



                    if (!writeValue) continue;


                    // WARNING should found another way for counting the properties;
                    const keys = Object.keys(item);
                    this.bufferWriter.__writeUInt16(keys.length);
                    
                    this.serialize(keys, false);
                    let values = Object.values(item);
                    this.serialize(values, true, false);
                    if (!arr) {
                        return this.serialize(values, false, true);
                    }
                    // writing the array length;
                    this.bufferWriter.__writeUInt16(arr.length);
                    
                    for (const arrItem of arr) {
                        console.log(arrItem)
                        this.serialize(Object.values(arrItem), false, true);
                    }
                }
        }
    }
}

const isInIntval = (v, min, max) => (v >= min && v <= max);