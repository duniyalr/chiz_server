module.exports = {
    login, 
}

function login(req, state, res, router) {
    const db = router.dbManager.__getConn();
    router.__afterAccess(null, req, state, db, res);
}