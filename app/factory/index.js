const {ObjectId} = require('mongodb');
const {getFactoryResponseSchema} = require("../schemas");
const {dictionaryList} = require("../../utils/parserUtils");

module.exports = {
    getActiveFactory
}

async function getActiveFactory(req, state, db, res) {
    const factoriesCollection = db.collection("factories");
    const result = await factoriesCollection.findOne({_id: ObjectId(state.activeFactory)});
    if (!result) {
        return res.__response(Object(getFactoryResponseSchema.err));
    }    
    const response = Object(getFactoryResponseSchema.ok);
    response.units = dictionaryList(result.units);

    return res.__response(response);
}