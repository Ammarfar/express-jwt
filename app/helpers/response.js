module.exports = {
    responseSuccess(message, data = null) {
        return {
            message: message,
            data: data,
            error: false
        };
    },

    responseError(message, data = null) {
        return {
            message: message,
            data: data,
            error: true
        };
    },
}