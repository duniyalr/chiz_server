module.exports = bufferPanel;

// this module should provide a api for working with the buffers in the fast way;

function bufferPanel() {
    this.bufferStack = new Array();
    this.length = 0;
    this.cursor = 0;
    this.activeBufferRemaining = 0;
    this.seek = 0;
    this.activeBufferSeek = 0;
    this.activeBuffer;
}

bufferPanel.prototype.__add = function __add(buf) {
    this.bufferStack.push(buf);
    this.length += buf.length;
    this.activeBufferRemaining = this.length;
    this.setActiveBuffer();
}

bufferPanel.prototype.__getAvailableBytes = function __getAvailableBytes() {
    return this.length - this.seek;
}

bufferPanel.prototype.setActiveBuffer = function setActiveBuffer() {
    if (!this.activeBuffer) {
        if (this.bufferStack[0]) {
            this.activeBuffer = this.bufferStack[0];
            this.activeBufferSeek = 0;
        } else {
            return false;
        }
    } else {
        if (this.activeBufferRemaining === 0) {
            if (this.bufferStack[this.cursor + 1]) {
                this.cursor++;
                this.activeBuffer = this.bufferStack[this.cursor];
                this.activeBufferRemaining = this.activeBuffer.lenght;
                this.activeBufferSeek = 0;
            } else {
                // stack is finished
            }
        } else {
            return false;
        }
    }
}

bufferPanel.prototype.__getChunk = function __getChunk(length) {
    if (length > this.__getAvailableBytes()) {
        return false;
    }

    const chunk = Buffer.allocUnsafe(length);
    let chunkSeek = 0;
    while(length > 0) {
        if (this.activeBufferRemaining < length) {
            this.activeBuffer.copy(chunk, chunkSeek, this.seek);
            chunkSeek += this.activeBufferRemaining;
            length -= this.activeBufferRemaining;
            this.seek += this.activeBufferRemaining;
            this.setActiveBuffer();
            continue;
        }

        this.activeBuffer.copy(chunk, chunkSeek, this.activeBufferSeek, this.activeBufferSeek + length);
        // at this point no need the update the chunkSeed or length because the operation will end;
        this.seek += length;
        this.activeBufferSeek += length;
        break;
    }
    return chunk;
}

bufferPanel.prototype.__getUInt16BE = function __getUInt16BE() {
    if (this.activeBufferRemaining < 2)
        return null;
    const res = this.activeBuffer.readUInt16BE(this.seek);
    this.activeBufferRemaining -= 2;
    this.seek += 2;
    this.activeBufferSeek += 2;
    return res;
} 

bufferPanel.prototype.__getUInt32BE = function __getUInt32BE() {
    if (this.activeBufferRemaining < 4)
        return null;
    const res = this.activeBuffer.readUInt32BE(this.seek);
    this.activeBufferRemaining -= 4;
    this.seek += 4;
    this.activeBufferSeek += 4;
    return res;
} 