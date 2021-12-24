const {userStateSchema, loginResponseSchema} = require("../schemas");
module.exports = {
    login
};

async function login(req, state, db, res) {
    if (state !== null) {
        // at this point user wants to login after that actually loged in;
        return;
    }
    // at this point there is no checking on the req states
    const usersCollection = db.collection("users");
    const result = await usersCollection.findOne({username : req.params[0].username});
    if (result === null) {
        // the user not found;
        return
    }
    // not checking password at this point;
    const userState = Object(userStateSchema);
    userState.username = result.username;
    userState.factories = result.factories;
    userState.activeFactory = result.activeFactory;
    res.__setState(userState);
    const response = Object(loginResponseSchema.ok);
    response.factories = userState.factories;
    response.activeFactory = userState.activeFactory;
    res.__response(response);
}