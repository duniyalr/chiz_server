const stdError = {
    ok: false,
    err: null
} 
const userStateSchema = {
    username: null,
    factories: null,
    activeFactory: null
}

const loginResponseSchema = {
    ok: {
        ok: true, 
        factories: null, 
        activeFactory: null
    },
    err: stdError

}

const getFactoryResponseSchema = {
    ok: {
        ok: true, 
        units: null,
    }, 
    err: stdError
}

module.exports = {
    userStateSchema,
    loginResponseSchema,
    getFactoryResponseSchema
}