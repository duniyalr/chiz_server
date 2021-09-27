const Parser = require("../stp/parser");

module.exports = router;

function router() {
    this.list = null; 
    this.accessList = null;
    this.dbManager = null;
}

router.prototype.__setList = function __setList(list) {
    this.list = list;
}

router.prototype.__setAccessList = function __setAccessList(list) {
    this.accessList = list;
}

router.prototype.__setDB = function __setDB(db) {
    this.dbManager = db;
}

router.prototype.__route = function __route(req, state, res) {
    if (req.route >= this.list.length) {
        res.__routerError('the rout not exist');
        return;
    }

    const route = this.list[req.route];
    // no checking for access list;
    const access = this.accessList[route.access];
    if(access.func) {
        access.func(req, state, res, this);
    } else {
        const dbConn = this.db.dbManager.__getConn();
        this.__afterAccess(null, req, state, dbConn, res);
    }
}

router.prototype.__afterAccess = function afterAccess(err, req, state, db, res) {
    if (err) {
        return;   
    }
    const route = this.list[req.route];
    if (route.func) route.func(req, state, db, res);
    else {}
}