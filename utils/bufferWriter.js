const {Buffer} = require("buffer");
module.exports = bufferWriter;

function WBuffer(size) {
    // there is a limit on size;
    this.buffer = Buffer.allocUnsafe(size).fill(0);
    this.seek = 0;
    this.size = size;
    this.remaining = size;
}

function bufferWriter() {
    this.bufferSize = 64 //there is no thought behind this value!
    this.bufferArray = [];
    this.activeBuffer = null;
    this.size = 0;
}

// this function creates a WBuffer instance every write function can call this function;
bufferWriter.prototype.requestBuffer = function requestBuffer(size) {
    const _WBuffer = new WBuffer(size ? size : this.bufferSize);
    this.bufferArray.push(_WBuffer);
    this.activeBuffer = _WBuffer;
}

bufferWriter.prototype.__writeUInt8 = function __writeUInt8(v) {
    if (this.activeBuffer.remaining < 1) this.requestBuffer()
    this.activeBuffer.buffer.writeUInt8(
        v,
        this.activeBuffer.seek
    );

    this.activeBuffer.seek++;
    this.activeBuffer.remaining--;
    this.size++;
}

bufferWriter.prototype.__writeUInt16 = function __writeUInt16(v) {
    if (this.activeBuffer.remaining < 2) this.requestBuffer()
    this.activeBuffer.buffer.writeUInt16BE(
        v,
        this.activeBuffer.seek
    );

    this.activeBuffer.seek += 2;
    this.activeBuffer.remaining -= 2;
    this.size += 2;
}

bufferWriter.prototype.__writeUInt32 = function __writeUInt32(v) {
    if (this.activeBuffer.remaining < 4) this.requestBuffer()
    this.activeBuffer.buffer.writeUInt32BE(
        v,
        this.activeBuffer.seek
    );

    this.activeBuffer.seek += 4;
    this.activeBuffer.remaining -= 4;
    this.size += 4;
}

bufferWriter.prototype.__writeInt8 = function __writeInt8(v) {
    if (this.activeBuffer.remaining < 1) this.requestBuffer()
    this.activeBuffer.buffer.writeInt8(
        v,
        this.activeBuffer.seek
    );

    this.activeBuffer.seek++;
    this.activeBuffer.remaining--;
    this.size++;
}

bufferWriter.prototype.__writeInt16 = function __writeInt16(v) {
    if (this.activeBuffer.remaining < 2) this.requestBuffer()
    this.activeBuffer.buffer.writeInt16BE(
        v,
        this.activeBuffer.seek
    );

    this.activeBuffer.seek += 2;
    this.activeBuffer.remaining -= 2;
    this.size += 2;
}

bufferWriter.prototype.__writeInt32 = function __writeInt32(v) {
    if (this.activeBuffer.remaining < 4) this.requestBuffer()
    this.activeBuffer.buffer.writeInt32BE(
        v,
        this.activeBuffer.seek
    );

    this.activeBuffer.seek += 4;
    this.activeBuffer.remaining -= 4;
    this.size += 4;
}

// at this point just assume every character takes only a byte not handling the utf8
bufferWriter.prototype.__writeString = function __writeString(str) {
    if (this.activeBuffer.remaining > 0) {
        if (str.length <= this.activeBuffer.remaining) {
            this.activeBuffer.buffer.write(str, this.activeBuffer.seek);
            this.activeBuffer.seek += str.length;
            this.activeBuffer.remaining -= str.length;
            this.size += str.length;
        } else {
            this.activeBuffer.buffer.write(str.substr(0), this.activeBuffer.seek);
            const _length = this.activeBuffer.remaining;
            this.size += this.activeBuffer;
            this.activeBuffer.seek += length;
            this.activeBuffer.remaining = 0;
            this.__writeString(str.substr(length), this.activeBuffer.seek);
        }
    } else {
        let size = this.bufferSize;
        if (str.length > this.bufferSize) size = str.length;
        this.requestBuffer(size);
        this.activeBuffer.write(str, this.activeBuffer.seek);
        this.activeBuffer.remaining = 0;
        this.activeBuffer.seek += size;
    }
}

// this function gets all the buffers that are currently in the array buffer
// and returns a new buffer.
bufferWriter.prototype.__collect = function __collect(skip) {
    const _buffer = Buffer.alloc(this.size + skip);
    let _seek = skip;
    for (let i = 0; i < this.bufferArray.length; i++) {
        const _WBuffer = this.bufferArray[i];
        _WBuffer.buffer.copy(_buffer, _seek, 0, _WBuffer.seek);
        _seek += _WBuffer.seek;
    }

    return _buffer;
}

bufferWriter.prototype.__clean = function __clean() {
    this.bufferArray = [];
    this.size = 0;
    this.activeBuffer = null;
}