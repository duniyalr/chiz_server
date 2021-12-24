module.exports = enumMaker;


function enumMaker(keys, start = 0) {
    const res = {};
    for (const key of keys) {
        res[key] = start++;
    }

    return Object.freeze(Object(res));
}