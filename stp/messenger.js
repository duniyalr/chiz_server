const bufferPanel = require("../utils/bufferPanel");
const enumMaker = require("../utils/enum");
const Message = require("./message");

module.exports = messenger;

const SUPPORTED_VERSION = 1;
const MAX_MESSAGE_LENGTH = 16 * 1024;

const STATUS = enumMaker(['IDLE', 'RECIEVING']);
const ERROR = enumMaker(['VERSION', 'MESSAGE_LENGTH'], 1);
const FIRST_DATA_MIN_SIZE = 12; // this simply says that at least you should send the whole header first


function messenger() {
    this.onMessage = undefined;
    this.bufferPanel = new bufferPanel();
    this.status = STATUS.IDLE;
    this.remainingLength = 0;    
    this.message;
}

/**
 * 
 * @param {buffer} data 
 */
messenger.prototype.__onData = function __onData(data) {
    if (data)
        this.bufferPanel.__add(data);
    const dataSize = this.bufferPanel.__getAvailableBytes();
    if (STATUS.IDLE === this.status) {
        if (FIRST_DATA_MIN_SIZE < dataSize) {
            this.newMessage(data);
            this.__onData();
        } else {}
    } else {
        if (this.remainingLength <= dataSize) {
            this.finishMessage();
        }
    }
}

/**
 * @api private
 */
messenger.prototype.newMessage = function newMessage() {
    this.message = new Message();
    // set the header
    this.message.version = this.bufferPanel.__getUInt16BE();
    if (this.message.version !== 1) {
        // TODO version in not support;
    }
    this.message.bodyLength = this.bufferPanel.__getUInt32BE();
    this.message.id = this.bufferPanel.__getUInt16BE();
    this.message.requestId = this.bufferPanel.__getUInt16BE();
    this.message.route = this.bufferPanel.__getUInt16BE();
    
    if (this.message.bodyLength !== 0)
        this.remainingLength = this.message.bodyLength;
    
    this.status = STATUS.RECIEVING;
}

messenger.prototype.finishMessage = function finishMessage() {
    this.message.bodyBuffer = this.bufferPanel.__getChunk(this.message.bodyLength);
    this.status = STATUS.IDLE;
    this.remainingLength = 0;
    this.onMessage(this.message);
    this.message = null;
}   