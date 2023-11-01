const ApiError = require('./api-error');
module.exports = function (err, req, res, next) {
    let message = 'Непредвиденная ошибка';
    let status = 500;
    if (err instanceof ApiError) {
        message = err.message;
        status = err.status;
    }
    console.log(err);
    return res.status(status).json(message);
};