module.exports = {
    responseApi(message, data = null, error = false) {
        return {
            message: message,
            data: data,
            error: error
        };
    }
}