module.exports = accessListItem;

function accessListItem(accessId, func) {
    return new function () {
        this.accessId = accessId;
        this.func = func;
    }
}