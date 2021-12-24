module.exports = {
    public, 
    user
}

function public(req, state, res, router) {
    const db = router.dbManager.__getConn();
    return router.__afterAccess(null, req, state, db, res);
}

function user(req, state, res, router) {
    const db = router.dbManager.__getConn();
    return router.__afterAccess(null, req, state, db, res);
}