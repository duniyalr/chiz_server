module.exports = router;

function router() {
    this.list = null; 
}

router.prototype.__setList = function __setList(list) {
    this.list = list;
}

router.prototype.__route = function __route(msg, state, stp) {

}