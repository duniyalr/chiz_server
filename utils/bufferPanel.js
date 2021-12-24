const {Buffer} = require("buffer");
const bufferSeeker = require("./bufferSeeker");

module.exports = bufferPanel;

// this module should provide a api for working with the buffers in the fast way;

function bufferPanel() {
    this.stack = [];
    this.size = 0;
    this.seek = 0;
    this.cursor = -1;
    this.activeBufferSeeker = null;
}

bufferPanel.prototype.__add = function (buf){
    if (!Buffer.isBuffer(buf))
        return false;
    const _bufferSeeker = new bufferSeeker();
    _bufferSeeker.__reset(buf);
    this.stack.push(_bufferSeeker);
    this.size += buf.length;

    if (!this.activeBufferSeeker)
        return this.setActiveBufferSeeker();
}

bufferPanel.prototype.setActiveBufferSeeker = function setActiveBufferSeeker() {
    if (
        this.stack.length === 0 ||
        // should check this condition
        this.stack.length <= this.cursor
    ) return false;
        
    return this.activeBufferSeeker = this.stack[++this.cursor];
}

bufferPanel.prototype.__getAvailableBytes = function (){
    return this.size - this.seek;
}

bufferPanel.prototype.__getUInt16BE = function __getUInt16BE() {
    if (!this.activeBufferSeeker) return false;
    if (this.activeBufferSeeker.__getRemaining() < 2) {
        const _chunk = this.__getChunk(2);
        if (_chunk) {
            return _chunk.readUInt16BE(0);
        }
        return false;
    } 
    this.seek += 2;
    return this.activeBufferSeeker.__readUInt16();
}

bufferPanel.prototype.__getUInt32BE = function __getUInt32BE() {
    if (!this.activeBufferSeeker) return false;
    if (this.activeBufferSeeker.__getRemaining() < 4) {
        const _chunk = this.__getChunk(4);
        if (_chunk) {
            return _chunk.readUInt32BE(0);
        }
        return false;
    } 
    this.seek += 4;
    return this.activeBufferSeeker.__readUInt32();
}

bufferPanel.prototype.__getChunk = function __getChunk(length) {
    if (this.__getAvailableBytes() < length) return false;
    // TODO should do have a check on length size 
    const resBuf = Buffer.allocUnsafe(length);
    let seek = 0;
    while(true) {
        let _bufferSeeker = this.activeBufferSeeker;
        const bufRemaining = _bufferSeeker.__getRemaining();
        if (bufRemaining === 0) {
            this.setActiveBufferSeeker();
            continue;
        }
        const bufLength = _bufferSeeker.buffer.length
        if (bufRemaining < length) {
            _bufferSeeker.buffer.copy(resBuf, seek, _bufferSeeker.seek);
            seek += bufLength;
            length -= bufLength;
            continue;
        }
        
        _bufferSeeker.buffer.copy(resBuf, seek, _bufferSeeker.seek, _bufferSeeker.seek+length);
        _bufferSeeker.seek += length;
        seek += length;
        break;
    }
    this.seek += seek;
    return resBuf;
}


// function bufferPanel() {
//     this.bufferStack = new Array();
//     this.length = 0;
//     this.cursor = 0;
//     this.activeBufferRemaining = 0;
//     this.seek = 0;
//     this.activeBufferSeek = 0;
//     this.activeBuffer;
// }

// bufferPanel.prototype.__add = function __add(buf) {
//     this.bufferStack.push(buf);
//     this.length += buf.length;
//     // this.activeBufferRemaining = this.length;
//     this.setActiveBuffer();
// }

// bufferPanel.prototype.__getAvailableBytes = function __getAvailableBytes() {
//     return this.length - this.seek;
// }

// bufferPanel.prototype.setActiveBuffer = function setActiveBuffer() {
//     if (!this.activeBuffer) {
//         if (this.bufferStack[0]) {
//             this.activeBuffer = this.bufferStack[0];
//             this.activeBufferSeek = 0;
//         } else {
//             return false;
//         }
//     } else {
//         if (this.activeBufferRemaining === 0) {
//             if (this.bufferStack[this.cursor + 1]) {
//                 this.cursor++;
//                 this.activeBuffer = this.bufferStack[this.cursor];
//                 this.activeBufferRemaining = this.activeBuffer.lenght;
//                 this.activeBufferSeek = 0;
//             } else {
//                 // stack is finished
//             }
//         } else {
//             return false;
//         }
//     }
// }

// bufferPanel.prototype.__getChunk = function __getChunk(length) {
//     if (length > this.__getAvailableBytes()) {
//         return false;
//     }

//     const chunk = Buffer.allocUnsafe(length);
//     let chunkSeek = 0;
//     while(length > 0) {
//         if (this.activeBufferRemaining < length) {
//             this.activeBuffer.copy(chunk, chunkSeek, this.seek);
//             chunkSeek += this.activeBufferRemaining;
//             length -= this.activeBufferRemaining;
//             this.seek += this.activeBufferRemaining;
//             this.setActiveBuffer();
//             continue;
//         }

//         this.activeBuffer.copy(chunk, chunkSeek, this.activeBufferSeek, this.activeBufferSeek + length);
//         // at this point no need the update the chunkSeed or length because the operation will end;
//         this.seek += length;
//         this.activeBufferSeek += length;
//         break;
//     }
//     return chunk;
// }

// bufferPanel.prototype.__getUInt16BE = function __getUInt16BE() {
//     if (this.activeBufferRemaining < 2)
//         return null;
//     const res = this.activeBuffer.readUInt16BE(this.seek);
//     this.activeBufferRemaining -= 2;
//     this.seek += 2;
//     this.activeBufferSeek += 2;
//     return res;
// } 

// bufferPanel.prototype.__getUInt32BE = function __getUInt32BE() {
//     if (this.activeBufferRemaining < 4)
//         return null;
//     const res = this.activeBuffer.readUInt32BE(this.seek);
//     this.activeBufferRemaining -= 4;
//     this.seek += 4;
//     this.activeBufferSeek += 4;
//     return res;
// } 

// bufferPanel.prototype.__clean = function __clean() {
//     this.bufferStack = new Array();
//     this.length = 0;
//     this.cursor = 0;
//     this.activeBufferRemaining = 0;
//     this.seek = 0;
//     this.activeBufferSeek = 0;
//     this.activeBuffer;
// }