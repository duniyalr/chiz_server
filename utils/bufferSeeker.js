module.exports = bufferSeeker;

// the default reading type is big endian;

function bufferSeeker() {
    this.buffer = null;
    this.size = 0;
    this.seek = 0;
}

bufferSeeker.prototype.__getRemaining = function __getRemaining() {
    return this.size - this.seek;
}

bufferSeeker.prototype.__reset = function __reset(buf) {
    this.buffer = buf;
    this.size = buf.length;
    this.seek = 0;
}

bufferSeeker.prototype.__readUInt8 = function __readUInt8() {
    const res = this.buffer.readUInt8(this.seek);
    this.seek += 1;
    return res;
}

bufferSeeker.prototype.__readUInt16 = function __readUInt16() {
    const res = this.buffer.readUInt16BE(this.seek);
    this.seek += 2;
    return res;
}

bufferSeeker.prototype.__readUInt32 = function __readUInt32() {
    const res = this.buffer.readUInt32BE(this.seek);
    this.seek += 4;
    return res;
}

bufferSeeker.prototype.__readInt8 = function __readInt8() {
    const res = this.buffer.readInt8(this.seek);
    this.seek += 1;
    return res;
}

bufferSeeker.prototype.__readInt16 = function __readInt16() {
    const res = this.buffer.readUInt16BE(this.seek);
    this.seek += 2;
    return res;
}

bufferSeeker.prototype.__readInt32 = function __readInt32() {
    const res = this.buffer.readInt32BE(this.seek);
    this.seek += 4;
    return res;
}

bufferSeeker.prototype.__readString = function __readString(length) {
    const res = this.buffer.toString("utf8", this.seek, this.seek + length);
    this.seek += length;
    return res;
}