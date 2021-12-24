module.exports = {
    dictionaryList
}

function dictionaryList(array) {
    if (!Array.isArray(array)) return false;
    return {
        dictionaryList: true,
        array
    }
}