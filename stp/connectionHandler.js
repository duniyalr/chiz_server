module.exports = connectionHandler;

function connectionHandler() {

}

/**
 * 
 * @param {boolean} err 
 */
connectionHandler.prototype.__onClose = function __onClose(err) {
    console.log("-> connection closed.");
}

/**
 * 
 * @param {Exception} err 
 */
connectionHandler.prototype.__onError = function __onError(err) {
    console.log("-> error in connection")
}