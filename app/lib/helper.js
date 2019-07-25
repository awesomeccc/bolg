class Resolve {
    success(msg = 'success', errorCode = 0, code = 200) {
        return {
            msg,
            code,
            errorCode
        }
    }

    json(data, msg = 'success', errorCode = 0, code = 200) {
        return {
            code,
            msg,
            errorCode,
            data
        }
    }
}

function success(msg,errorCode){
    throw new global.errs.Success(msg, errorCode)
}

module.exports = {
    Resolve,
    success
}
